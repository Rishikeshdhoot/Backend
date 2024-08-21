const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const v1Routes = require("./routes/v1/index");
const { connectDb } = require("./config/dbconnection");
const { Config } = require("./config");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const logger = require("morgan");
// const multer = require("multer");
const bodyParser = require("body-parser");
// const aws = require("aws-sdk");
const { upload } = require("./middlewares/v1/file");

// Configuration
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/public", express.static("public"));
connectDb();

// const storage = multer.diskStorage({
//   destination: function (request, file, cb) {
//     cb(null, "./public/temp");
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function (request, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'temp'); // Save files to the 'temp' directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.filename));
//   },
// });


// const upload = multer({
//   storage,
// });

app.use(upload.none());

// Set up AWS SDK with your credentials
// aws.config.update({
//   accessKeyId: Config.AWS_ACCESS_KEY,
//   secretAccessKey: Config.AWS_ACCESS_SECRET,
//   region: Config.S3_REGION,
// });

if (!fs.existsSync(`public`)) fs.mkdirSync(`public`);
if (!fs.existsSync(`logs`)) fs.mkdirSync(`logs`);
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Fornax");
});
app.use(v1Routes);

const server = http.createServer(app);
// Start Server
server.listen(Config.PORT, () => {
  console.log("Fornax server listening on port " + Config.PORT);
});
