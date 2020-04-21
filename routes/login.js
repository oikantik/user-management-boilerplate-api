const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ response: "it is working" });
});

module.exports = router;
