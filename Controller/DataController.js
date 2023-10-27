const DataModel = require("../Model/DataModel");

const PostData = async (req, res) => {
  try {
    let data = await DataModel.create(req.body);
    if (data) {
      res.status(200).json({
        status: "success",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const FetchData = async (req, res) => {
  try {
    let data = await DataModel.find();
    if (data) {
      res.status(200).json({
        status: "success",
        message: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = { PostData, FetchData };
