const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    data: Object,
  },
  { timeseries: true }
);

const DataModel = mongoose.model("Data", DataSchema);

module.exports = DataModel;
