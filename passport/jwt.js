const jwtStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const config = require("config");

const User = require("../models/User");
const secretJWT = config.get("secretJWT");

module.exports = function (passport) {
  const options = {
    jwtFromRequest: extractJWT.fromAuthHeaderWithScheme("bearer"),
    secretOrKey: secretJWT,
  };

  passport.use(
    new jwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload.id });
        if (!user) done(null, false);
        done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
