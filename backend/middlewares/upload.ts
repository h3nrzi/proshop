import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },

  filename(req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const fileTypes = /jpg|jpeg|png|webp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (!extname || !mimetype) return callback(new Error("Image only supports!"));

  callback(null, true);
};

const upload = multer({ storage, fileFilter });
export default upload;
