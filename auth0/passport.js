const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Ensure you're importing the Strategy
const { PrismaClient, Prisma } = require('@prisma/client');
const User = require("./models/User.js")
passport.use(new GoogleStrategy(
  {
    clientID: "234706959712-86p9g7n7ptk71jb9t96tgdl58a2mije5.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },
  (accessToken, refreshToken, profile, done) => {
    async (accessToken, refreshToken, profile, done) => {
        try {
          // Find existing user
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            // User exists, generate JWT
            const token = jwt.sign(
              { id: user._id, email: user.email },
              'ananta',
              { expiresIn: '1h' }
            );
            return done(null, { user, token });
          } else {
            // Create new user
            user = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
            });
            await user.save();
            const token = jwt.sign(
              { id: user._id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
            );
            return done(null, { user, token });
          }
        } catch (err) {
          return done(err, false);
        }
      }
  }
));
