const express = require("express");
const {
  PostData,
  FetchData,
  FetchDataRange,
} = require("../Controller/DataController");
const DataRouter = express.Router();

DataRouter.route("/Post").post(PostData);
DataRouter.route("/Fetch").get(FetchData);
DataRouter.route("/FetchData").post(FetchDataRange);

module.exports = DataRouter;
