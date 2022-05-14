var passport = require("passport");
var GithubStrategy = require("passport-github").Strategy;

var User = require("../models/user");

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: " /auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url,
      };
      user.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(profileData, (err, addedUser) => {
            if (err) return done(err);
            return done(null, addedUser);
          });
        }
        done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, "name , email , username", (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
