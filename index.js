const express = require("express");
const app = express();
const cors = require("cors");
const DbConnection = require("./Config");
const DataRouter = require("./Route/DataRoute");
const AutRouter = require("./Route/Aut");

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("running")
})
app.use("/api/v1/Emami", DataRouter);
app.use("/api/v1/Aut", AutRouter);

const Port = 4500;
app.listen(Port, () => {
  console.log(`Server is listening on ${Port}`);
  DbConnection();
});
