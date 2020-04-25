const jwtStrategy = require("passport-jwt").Strategy;
const config = require("config");

const User = require("../models/User");
const secretJWT = config.get("secretJWT");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

module.exports = function (passport) {
  const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: secretJWT,
  };

  passport.use(
    new jwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload.id });
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
