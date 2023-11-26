import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const generateUniqueFileName = (file) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = file.name.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

export const fileUploadToS3 = async (file) => {
  const uniqueFileName = generateUniqueFileName(file);

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_PIC_BUCKET_NAME,
    Key: uniqueFileName,
    Body: file,
    ACL: 'public-read',
    ContentType: file.type, 
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // 업로드된 파일의 URL 반환
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};
