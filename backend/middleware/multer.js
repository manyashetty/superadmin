const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require("dotenv").config();

// Configure AWS S3 client
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  endpoint: 'https://s3.wasabisys.com',
});


// Function to generate a 12-hour pre-signed URL for public access
const generatePublicPresignedUrl = (key) => {
  const params = {
    Bucket: process.env.WASABI_BUCKET, 
    Key: key,
    Expires: 43200, // 12 hours (12 hours * 3600 seconds)
  };
  return s3.getSignedUrl('getObject', params);
};

// Configure Multer for file uploads to Wasabi
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.WASABI_BUCKET, 
    key: (req, file, cb) => {
      cb(null, 'posts/' + Date.now() + '_' + file.originalname);
    },
    acl: 'public-read', // Set the ACL to 'public-read' for public access
  }),
});

module.exports = { upload, generatePublicPresignedUrl, s3 };
