const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://developer:uJhPp8IX3x3BMLKl@cluster0.scdi72u.mongodb.net/"
  )
  .then((res) => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });
