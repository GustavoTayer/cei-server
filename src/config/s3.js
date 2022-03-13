// const AWS = require('aws-sdk')

// // const myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'IDENTITY_POOL_ID'});
// // var myConfig = new AWS.Config({
// //   credentials: myCredentials, region: 'sa-east-1'
// // });

// const s3 = () => {
//     process.env.AWS_SECRET_ACCESS_KEY=''
//     process.env.AWS_ACCESS_KEY_ID=''
//     AWS.config.update({region: })
//     const s = new AWS.S3({apiVersion: '2006-03-01'});
//     return s
// }

// module.exports = {
//     s3
// }

const AWS = require('aws-sdk');
 
const s3Client = new AWS.S3({
  signatureVersion: 'v4'
});
 
const uploadParams = {
         Bucket: process.env.AWS_BUCKET_NAME, 
         Key: '', // pass key
         Body: null, // pass file body
};
 
const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;
 
module.exports = s3;