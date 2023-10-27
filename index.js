const express = require("express");
const app = express();
const cors = require("cors");
const DbConnection = require("./Config");
const DataRouter = require("./Route/DataRoute");
const AutRouter = require("./Route/Aut");
const DataModel = require("./Model/DataModel");

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    let data = new DataModel(req.body);
    data = await data.save();
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
});

app.use("/api/v1/Emami", DataRouter);
app.use("/api/v1/Aut", AutRouter);

const Port = 4500;
app.listen(Port, () => {
  console.log(`Server is listening on ${Port}`);
  DbConnection();
});
