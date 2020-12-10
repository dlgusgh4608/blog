const aws = require('aws-sdk');
const multer = require('multer');
const mutlerS3 = require('multer-s3');
const { extname } = require('path');
const { v4 } = require('uuid');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';

const upload = multer({
  storage: mutlerS3({
    s3,
    acl: 'public-read',
    bucket: BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, '' + v4().replace(/-/g, '') + extname(file.originalname));
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

module.exports = upload;
