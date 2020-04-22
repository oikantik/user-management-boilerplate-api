const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// db connection
require("./config/db")();

app.use(express.json());

// login
app.use("/login", require("./routes/login"));
// register
app.use("/register", require("./routes/register"));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
