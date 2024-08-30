const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const DBConnect = require("./config/DBconnect");
const router = require("./Routes/registerRouter");

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api", router);

// Connect to the database
DBConnect();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
