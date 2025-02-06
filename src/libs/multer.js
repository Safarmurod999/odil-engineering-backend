import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("file", `${process.cwd()}/src/uploads`);
    let path =
      req.url.split("/")[1] == "signup" ? "users" : req.url.split("/")[1];
    console.log("req.baseUrl", path);
    cb(null, `${process.cwd()}/src/uploads/${path}`);
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
      file.mimetype.split("/")[1] == "svg"
        ? true
        : false;

    cb(null, mimetype);
  },
});
