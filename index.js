const express = require("express");

const { rolerouter } = require("./routes/Traveller-router");
const { rolerouters } = require("./routes/Booking-router");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 5000;


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/Traveller", rolerouter);
app.use("/Booking", rolerouters);
app.listen(PORT, () => {

  console.log("Server is running..");

});

module.exports = app