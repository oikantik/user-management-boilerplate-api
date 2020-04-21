const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ response: "it is working" });
});

app.listen(5000, () => {
  console.log("Listening to port ");
});
