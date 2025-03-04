import multer from "multer";
import { existsSync, mkdirSync } from "fs";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath = req.url
      ? req?.url?.split("/")[1] == "signup"
        ? "users"
        : req?.url?.split("/")[1]
      : "";
    const uploadPath = path.join(process.cwd(), "src/uploads", folderPath);
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log(file);

    cb(null, Date.now() + file?.mimetype?.split("/")[1]);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const mimetype =
      file.mimetype.split("/")[1] == "png" ||
      file.mimetype.split("/")[1] == "svg" ||
      file.mimetype.split("/")[1] == "jpeg" ||
      file.mimetype.split("/")[1] == "jpg"
        ? true
        : false;

    cb(null, mimetype);
  },
});
