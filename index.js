import express from "express";
import multer from "multer";
const app = express();

const upload = multer({ dest: "uploads/" });
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("uploading images while post");
});
app.listen(8080, () => {
  console.log("listening on port 80880");
});
