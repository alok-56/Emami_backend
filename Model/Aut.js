const mongoose = require("mongoose");

const AutSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AutModel = mongoose.model("Aut", AutSchema);
module.exports = AutModel;
