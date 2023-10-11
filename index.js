import express from "express";
import multer from "multer";
const app = express();

// upload single file;

const upload = multer({ dest: "uploads/" });
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.send("uploading images while post");
// });

//uploading multiple images
app.post("/upload", upload.array("file"), (req, res) => {});
app.listen(8080, () => {
  console.log("listening on port 80880");
});
