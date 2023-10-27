const { response } = require("express");
const DataModel = require("../Model/DataModel");

//-----------------Post Data into mongodb---------------------//

const PostData = async (req, res) => {
  try {
    let incomingData = req.body;
    const newDocument = new DataModel({ dynamicData: [incomingData] });
    let response = await newDocument.save();
    if (response) {
      res.status(200).json({
        status: "success",
        data: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//--------------------------FetchData All Data From MOngodb-------------------------------------//

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

//-------------------------Fetch Range of Data from Mongodb-----------------------------------//
const FetchDataRange = async (req, res) => {
  //------------------Month------------------------------//
  let jan = 0;
  let feb = 0;
  let march = 0;
  let april = 0;
  let may = 0;
  let june = 0;
  let july = 0;
  let augest = 0;
  let sept = 0;
  let oct = 0;
  let nov = 0;
  let dec = 0;

  //--------------------Week------------------------------//

  let sun=0;
  let mon=0;
  let tues=0;
  let wed=0;
  let thues=0;
  let fri=0;
  let sat=0;

  
  let startDate = new Date(req.body.startDate).toISOString();
  let endDate = new Date(req.body.endDate).toISOString();
  try {
    let result = await DataModel.find({
      $and: [
        {
          $and: [
            {
              "dynamicData.created": {
                $gte: startDate,
              },
            },
            {
              "dynamicData.created": {
                $lte: endDate,
              },
            },
          ],
        },
        {
          "dynamicData.qr_code_name": req.body.qr_code_name,
        },
      ],
    });

    result.forEach((item, index) => {
      let month = new Date(item.dynamicData[0].created).getMonth() + 1;
      if (month == 1) {
        jan = jan + 1;
      } else if (month == 2) {
        feb = feb + 1;
      } else if (month == 3) {
        march = march + 1;
      } else if (april == 4) {
        april = april + 1;
      } else if (month == 5) {
        may = may + 1;
      } else if (month == 6) {
        june = june + 1;
      } else if (month == 7) {
        july = july + 1;
      } else if (month == 8) {
        augest = augest + 1;
      } else if (month == 9) {
        sept = sept + 1;
      } else if (month == 10) {
        oct = oct + 1;
      } else if (month == 11) {
        nov = nov + 1;
      } else if (month == 12) {
        dec = dec + 1;
      }
    });
    if (result.length < 0) {
      return res.status(400).json({
        status: "success",
        data: "not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: result,
      month: {
        jan,
        feb,
        march,
        april,
        may,
        june,
        july,
        augest,
        sept,
        oct,
        nov,
        dec,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

module.exports = { PostData, FetchData, FetchDataRange };
