const passportJWT = require('passport-jwt');
const User = require('../models/User');

const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const options = {
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT
};

module.exports = passport => {
  try {
    passport.use(new JWTStrategy(options, async (payload, next) => {
      const user = await User.findById(payload.id);

      return user ? next(null, user) : next(null, false);
    }));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}