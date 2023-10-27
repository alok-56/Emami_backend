const { PostData, FetchData } = require("../Controller/DataController");

const express = require("express");
const DataRouter = express.Router();

DataRouter.route("/Post").post(PostData);
DataRouter.route("/Fetch").get(FetchData);

module.exports = DataRouter;
