const { response } = require("express");
const DataModel = require("../Model/DataModel");
const axios = require("axios");

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

  let sun = 0;
  let mon = 0;
  let tues = 0;
  let wed = 0;
  let thues = 0;
  let fri = 0;
  let sat = 0;

  let startDate = new Date(req.body.data.startDate).toISOString();
  let endDate = new Date(req.body.data.endDate).toISOString();

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
          "dynamicData.qr_code_name": req.body.data.qr_code_name,
        },
      ],
    });

    result.forEach((item, index) => {
      let week = item.dynamicData[0].day;
      if (week == "Monday") {
        mon = mon + 1;
      } else if (week == "Tuesday") {
        tues = tues + 1;
      } else if (week == "Wednesday") {
        wed = wed + 1;
      } else if (week == "Thursday") {
        thues = thues + 1;
      } else if (week == "Friday") {
        fri = fri + 1;
      } else if (week == "Saturday") {
        sat = sat + 1;
      } else if (week == "Sunday") {
        sun = sun + 1;
      }
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
      TotalScans: result.length,
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
      week: {
        mon,
        tues,
        wed,
        thues,
        fri,
        sat,
        sun,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

//---------------------Fetch Data scan by OS-------------------//

const FetchOsData = async (req, res) => {
  let startDate = new Date(req.body.data.startDate).toISOString();
  let endDate = new Date(req.body.data.endDate).toISOString();

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
          "dynamicData.qr_code_name": req.body.data.qr_code_name,
        },
      ],
    });

    const groupedData = {};
    result.forEach((item) => {
      const browserFamily = item.dynamicData[0].os_family;
      if (!groupedData[browserFamily]) {
        groupedData[browserFamily] = 0;
      }
      groupedData[browserFamily]++;
    });

    if (result.length < 0) {
      return res.status(400).json({
        status: "success",
        data: "not found",
      });
    }
    return res.status(200).json({
      Os: groupedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};

//-----------------------Fetch Browser Data-------------------------//

const BrowserData = async (req, res) => {
  let startDate = new Date(req.body.data.startDate).toISOString();
  let endDate = new Date(req.body.data.endDate).toISOString();
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
          "dynamicData.qr_code_name": req.body.data.qr_code_name,
        },
      ],
    });

    const groupedData = {};
    result.forEach((item) => {
      const browserFamily = item.dynamicData[0].browser_family;
      if (!groupedData[browserFamily]) {
        groupedData[browserFamily] = 0;
      }
      groupedData[browserFamily]++;
    });
    res.status(200).json({
      data: groupedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
};


//-----------------------Fetch Devices data---------------------//

const fetchDevice=async(req,res)=>{
  let startDate = new Date(req.body.data.startDate).toISOString();
  let endDate = new Date(req.body.data.endDate).toISOString();
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
          "dynamicData.qr_code_name": req.body.data.qr_code_name,
        },
      ],
    });

    const groupedData = {};
    result.forEach((item) => {
      const browserFamily = item.dynamicData[0].device_type;
      if (!groupedData[browserFamily]) {
        groupedData[browserFamily] = 0;
      }
      groupedData[browserFamily]++;
    });
    res.status(200).json({
      data: groupedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      data: error.message,
    });
  }
}


// //-----------------------Fetch State data---------------------//

// const fetchLocation=async(req,res)=>{
//   let startDate = new Date(req.body.data.startDate).toISOString();
//   let endDate = new Date(req.body.data.endDate).toISOString();
//   try {
//     let result = await DataModel.find({
//       $and: [
//         {
//           $and: [
//             {
//               "dynamicData.created": {
//                 $gte: startDate,
//               },
//             },
//             {
//               "dynamicData.created": {
//                 $lte: endDate,
//               },
//             },
//           ],
//         },
//         {
//           "dynamicData.qr_code_name": req.body.data.qr_code_name,
//         },
//       ],
//     });

//     const groupedData = {};
//     result.forEach((item) => {
//       const browserFamily = item.dynamicData[0].device_type;
//       if (!groupedData[browserFamily]) {
//         groupedData[browserFamily] = 0;
//       }
//       groupedData[browserFamily]++;
//     });
//     res.status(200).json({
//       data: groupedData,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "error",
//       data: error.message,
//     });
//   }
// }

//---------------------Fetch Combined Data--------------------------//

const FetchCombined = async (req, res) => {
  try {
    const data = await axios.get("https://emami-backend-indol.vercel.app/api/v1/Emami/fetch");
    const rangebymonth = await axios.post(
      "https://emami-backend-indol.vercel.app/api/v1/Emami/FetchData",
      {
        headers: {
          "content-type": "application/json",
        },
        data: {
          qr_code_name: req.body.qr_code_name,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      }
    );
    const rangebyos = await axios.post(
      "https://emami-backend-indol.vercel.app/api/v1/Emami/FetchOs",
      {
        headers: {
          "content-type": "application/json",
        },
        data: {
          qr_code_name: req.body.qr_code_name,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      }
    );
    const rangebybrowser = await axios.post(
      "https://emami-backend-indol.vercel.app/api/v1/Emami/Fetchbrowser",
      {
        headers: {
          "content-type": "application/json",
        },
        data: {
          qr_code_name: req.body.qr_code_name,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      }
    );

    const rangebyDevice = await axios.post(
      "https://emami-backend-indol.vercel.app/api/v1/Emami/Fetchdevice",
      {
        headers: {
          "content-type": "application/json",
        },
        data: {
          qr_code_name: req.body.qr_code_name,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
      }
    );
    res.status(200).json({
      TotalScan: data.data.length,
      month: rangebymonth.data,
      os: rangebyos.data,
      browserFamily: rangebybrowser.data,
      device:rangebyDevice.data
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  PostData,
  FetchData,
  FetchDataRange,
  FetchOsData,
  FetchCombined,
  BrowserData,
  fetchDevice
};
