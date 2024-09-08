
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

var AWS = require("aws-sdk");

AWS.config.update({
 region: "local",
 accessKeyId: "accessKeyId",
 secretAccessKey: "secretAccessKey",
 endpoint: new AWS.Endpoint(""),
});

console.log(process.env.REGION)
console.log(process.env.ENDPOINT)
const ddbClient = new DynamoDBClient({
 region: process.env.REGION || "localhost",
 endpoint: process.env.ENDPOINT || "http://localhost:8000",
});

module.exports = { ddbClient };

