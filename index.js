import express from "express";
import multer from "multer";
// import uuid from "uuid/v4";
import { v4 as uuidv4 } from "uuid";
const app = express();

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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;

    cb(null, `${uuidv4()}-${originalname}`);
  },
});
const upload = multer({ storage, fileFilter });

//uploading multiple images
app.post("/upload", upload.array("file"), (req, res) => {
  res.send("uploading images while post");
});
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      res.status(500).send("Send image type ");
    }
  } else if (err) {
    // An unknown error occurred when uploading.
  }
});
app.listen(8080, () => {
  console.log("listening on port 8080");
});
