const mongoose = require("mongoose");

const DbConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://developer:sX1VAEMakE0YON8V@cluster0.cxvsf8k.mongodb.net/"
    )
    .then((res) => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = DbConnection;
