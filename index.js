const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

// db connection
require("./config/db")();

// setup cors
const corsSettings = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// handlers
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors(corsSettings));
app.use(cookieParser());

// Init passport
app.use(passport.initialize());
require("./passport/jwt")(passport);

// login
app.use("/login", require("./routes/no-auth/login"));
// register
app.use("/register", require("./routes/no-auth/register"));

// protected routes
app.use("/members", require("./routes/auth/members"));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
