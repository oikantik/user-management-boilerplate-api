const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

// db connection
require("./config/db")();

// setup cors
const corsSettings = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// handlers
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsSettings));

// login
app.use("/login", require("./routes/login"));
// register
app.use("/register", require("./routes/register"));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
