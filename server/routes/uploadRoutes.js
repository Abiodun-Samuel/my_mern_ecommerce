import express from "express";
import multer from "multer";
const router = express.Router();
import path from "path";
import { uploadToCloudinary } from "../controllers/uploadController.js";

// post route to cloudinary
router.post("/upload-cloudinary", uploadToCloudinary);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filertypes = /jpg|jpeg|png|svg|jfif/;
  const extname = filertypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filertypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cd("Images Only");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
