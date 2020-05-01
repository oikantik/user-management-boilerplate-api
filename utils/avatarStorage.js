const { v1: uuidv1 } = require("uuid");
const path = require("path");

const avatarStorage = {
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = uuidv1();
    cb(null, fileName + path.extname(file.originalname));
  },
};

module.exports = avatarStorage;
