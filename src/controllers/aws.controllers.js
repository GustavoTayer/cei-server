const stream = require('stream');
const s3 = require('../config/s3');
const { s3Client } = require('../config/s3');
const { uniqueId } = require('lodash');
const uuid = require('uuid')

exports.doUpload = (req, res, folder) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;
  
  params.Key = `${folder}/${req.file.originalname}`;
  params.Body = req.file.buffer;

  s3Client.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({error:"Error -> " + err});
    }
    res.json({message: 'File uploaded successfully! -> keyname = ' + req.file.originalname});
  });
}

exports.getLink = (req, res) => {
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'Nicollas.JPG',
        Expires: 100,
    }
    const url = s3Client.getSignedUrl('getObject', params)
    console.log(url)
}