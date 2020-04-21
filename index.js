const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// login
app.use("/", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
