import type { SetStateAction } from "react";
import { fileUploadToS3 } from "@/app/utils/s3/fileUploadToS3.js";

const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: SetStateAction<string | undefined>) => void
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  await Promise.all(
    files.map(async (file) => {
      const url = await fileUploadToS3(file);

      // 이미지를 삽입할 때 파일명을 제외하고 삽입
      const insertedMarkdown = `![](${url})`;

      // 텍스트 영역에 이미지 삽입
      setMarkdown(insertedMarkdown);
    }),
  );
};

export default onImagePasted;
