import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", `${process.cwd()}/src/uploads`);
    cb(null, `${process.cwd()}/src/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const mimetype =
      file.mimetype.split("/")[1] == "png" ||
      file.mimetype.split("/")[1] == "jpg" ||
      file.mimetype.split("/")[1] == "svg"
        ? true
        : false;

    cb(null, mimetype);
  },
});
