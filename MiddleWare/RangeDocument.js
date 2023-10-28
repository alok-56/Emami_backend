const RangeDocuments = async (req, res, next) => {
  try {
    let startDate = new Date(req.body.startDate).toISOString();
    let endDate = new Date(req.body.endDate).toISOString();
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
    req.result = result;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports=RangeDocuments
