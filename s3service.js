import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3.js";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (file) => {
  //   const { S3 } = pkg;

  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secreatAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new S3({
    region,
    accessKeyId,
    secreatAccessKey,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };
  const result = await s3.upload(params).promise();
  return result;
};
