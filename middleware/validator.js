const validator = require("validator");
const { isObjEmpty } = require("../utils/helpers");

module.exports = {
  registrationValidation: (req, res, next) => {
    if (isObjEmpty(req.body))
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });

    const { name, email, password, dob, gender } = req.body.data;

    if (validator.isEmpty(name))
      return res.status(400).json({
        success: false,
        message: "Please enter your name",
      });

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });

    if (validator.isEmpty(password))
      return res.status(400).json({
        success: false,
        message: "Please enter your password",
      });

    if (validator.isEmpty(dob))
      return res.status(400).json({
        success: false,
        message: "Please enter your date of birth",
      });
    if (validator.isEmpty(gender))
      return res.status(400).json({
        success: false,
        message: "Please enter your gender",
      });
    next();
  },
  LoginValidation: (req, res, next) => {
    if (isObjEmpty(req.body))
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });

    const { email, password } = req.body.data;

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });

    if (validator.isEmpty(password))
      return res.status(400).json({
        success: false,
        message: "Please enter your password",
      });

    next();
  },
};
