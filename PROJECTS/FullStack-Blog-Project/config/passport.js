const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");
const bcrypt = require("bcryptjs");
module.exports = function (passport) {
  // Define the local strategy for email and password authentication
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "User does not exist. Please register first.",
            });
          }
          // Compare the provided password with the hashed password in the database
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return done(null, false, {
              message: "Incorrect password. Please try again.",
            });
          }
          // Authentication successful, return the user object
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //serializeUser: Determines which data of the user object should be stored in the session. Here, we store the user ID.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  //Deserialize the user object based on the user ID stored in the session
  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
