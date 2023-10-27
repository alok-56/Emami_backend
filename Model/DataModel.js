const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    dynamicData: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

const DataModel = mongoose.model("Data", DataSchema);

module.exports = DataModel;
