const multer = require("multer");

// Set up storage for multer
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    console.log("fileq is", file);
    cb(null, "temp"); // Save files to the 'temp' directory
  },
  filename: function (req, file, cb) {
    console.log("file is", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

module.exports.upload = multer({ storage: storage });
