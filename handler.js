var app = require("./index")

var serverless = require("serverless-http")

exports.handler = serverless(app)