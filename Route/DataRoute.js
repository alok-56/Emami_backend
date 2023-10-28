const express = require("express");
const {
  PostData,
  FetchData,
  FetchDataRange,
  FetchCombined,
  FetchOsData,
  BrowserData,
  fetchDevice,
} = require("../Controller/DataController");
const DataRouter = express.Router();

DataRouter.route("/Post").post(PostData);
DataRouter.route("/Fetch").get(FetchData);
DataRouter.route("/FetchData").post(FetchDataRange);
DataRouter.route("/FetchOs").post(FetchOsData)
DataRouter.route("/Combined").get(FetchCombined)
DataRouter.route("/Fetchbrowser").post(BrowserData)
DataRouter.route("/Fetchdevice").post(fetchDevice)

module.exports = DataRouter;
