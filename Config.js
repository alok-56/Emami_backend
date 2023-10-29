const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://dosti1166:ZQVKE6RJ4MommQeq@cluster0.huk0pb3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });
