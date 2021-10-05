const GoogleStrategy = require("passport-google-oauth20").Strategy;
const generatePassword = require("password-generator");

const authServices = require("../services/authService");
const jwtServices = require("../services/jwtService");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.oAuth_ClientID,
        clientSecret: process.env.oAuth_ClientSecret,
        callbackURL: process.env.oAuth_CallbackURL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const email = profile.emails[0].value;
          const user = await authServices.checkEmail(email);
          if (!user) {
            const password = await generatePassword(8, false);
            const newUser = {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              username: profile.emails[0].value.split("@")[0],
              email: profile.emails[0].value,
              password,
              role: "user",
            };
            await authServices.saveUser(newUser);
            const token = await jwtServices.createToken(
              {
                username: newUser.username,
                role: newUser.role,
              },
              "false"
            );
            return cb(null, { newUser, token });
          }
          const token = await jwtServices.createToken(
            {
              username: user.username,
              role: user.role,
            },
            "false"
          );
          return cb(null, { user, token });
        } catch (err) {
          throw err;
        }
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
