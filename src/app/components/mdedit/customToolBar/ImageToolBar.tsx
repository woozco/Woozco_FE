import React from "react";
import { ICommand, TextState, TextAreaTextApi } from "@uiw/react-md-editor";
import { fileUploadToS3 } from "@/app/utils/s3/fileUploadToS3";

const Image: ICommand = {
    name: "customCommand",
    keyCommand: "customCommand",
    buttonProps: { "aria-label": "Insert Custom Command" },
    icon: (
        <svg width="12" height="12" viewBox="0 0 20 20">
            <path
                fill="currentColor"
                d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
            ></path>
        </svg>
    ),
    execute: async (state: TextState, api: TextAreaTextApi) => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";

        fileInput.addEventListener("change", async () => {
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];

                try {
                    // 업로드된 파일의 URL 받아오기
                    const imageUrl = await fileUploadToS3(file);

                    // Insert the image URL into the editor
                    api.replaceSelection(`![Alt text](${imageUrl})`);
                } catch (error) {
                    console.error("Error uploading file to S3:", error);
                } finally {
                    // Optional: Remove the file input from the DOM
                    document.body.removeChild(fileInput);
                }
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click();
    },
};

export default Image;
