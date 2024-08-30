const mongoose = require("mongoose");

const DBConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database connection successful ^_^");
    })
    .catch((err) => {
      console.log("Database connection error:", err.message);
      process.exit(1); // Exit the process with a failure code
    });
};

module.exports = DBConnect;
