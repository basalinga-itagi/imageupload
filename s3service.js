import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

uploadImage = async (file) => {
  const s3 = new S3();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    key: `uploads/${file.originalname}`,
    Body: file.buffer,
  };
  const result = await s3.upload(params).promise();
  return result;
};
