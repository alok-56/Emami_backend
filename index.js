const express = require("express");
const cors = require("cors");
require("./Config");


const DataRouter = require("./Route/DataRoute");
const AutRouter = require("./Route/Aut");
const bodyparser=require('body-parser');
const morgan = require("morgan");

const app = express();
app.use(morgan('dev'))
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

app.use("/api/v1/Emami", DataRouter);
app.use("/api/v1/Aut", AutRouter);

const Port = 4500;
app.listen(Port, () => {
  console.log(`Server is listening on ${Port}`);
});
