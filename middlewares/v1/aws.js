const multer = require("multer");
const aws = require("aws-sdk");

const s3 = new aws.S3();
// Reusable file upload and AWS S3 middleware
module.exports.uploadToS3Middleware =
  (fields, bucketName, acl = "public-read") =>
  async (req, res, next) => {
    const diskStorage = multer.diskStorage({
      destination: function (request, file, cb) {
        cb(null, "./public/temp");
      },
      filename: function (request, file, cb) {
        cb(
          null,
          file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
      },
    });

    const uploadMiddleware = multer({
      storage: multer.memoryStorage(), // AWS S3 storage for in-memory processing
      fileFilter: function (request, file, cb) {
        // Your file filter logic if needed
        // For example, you can check the file type or size
        cb(null, true);
      },
    }).fields(fields);

    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Upload files to S3 and get the links
      for (const fieldName in req.files) {
        req.body[fieldName] = await Promise.all(
          req.files[fieldName].map(
            async (file) => await uploadToS3AndGetLink(file, bucketName, acl)
          )
        );
      }

      next();
    });
  };

// Function to upload a file to S3 and return the link
const uploadToS3AndGetLink = async (file) => {
//   const params = {
//     Bucket: "your-s3-bucket-name",
//     Key: file.originalname,
//     Body: file.buffer,
//     ACL: "public-read", // Optional: Set the file ACL as needed
//   };

//   const result = await s3.upload(params).promise();
  return "result.Location";
};
