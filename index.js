import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "./s3service.js";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const s3 = new AWS.S3();
// upload single file;

// const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.send("uploading images while post");
// });

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  if (file.mimetype.split("/")[0] === "image") {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb(new Error("Its type is not correct!"), false);
  }
}

//custom file name
// uuid-originalfilnamae
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const { originalname } = file;

//     cb(null, `${uuidv4()}-${originalname}`);
//   },
// });

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// Configure multer to use S3 storage
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + "-" + file.originalname);
//     },
//   }),
// });

//memory. storage.
const storage = multer.memoryStorage();
const upload = multer({ storage });

//uploading multiple images
app.post("/upload", upload.array("file"), async (req, res) => {
  const files = req.files[0];
  // console.log("files", files);
  const result = await uploadImage(files);
  // console.log("result", req.file.location);
  res.json({ imageUrl: result });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ error: "An error occurred while uploading the image" });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
