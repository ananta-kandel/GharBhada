const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const generateToken = require("../helpers/generateToken"); // Your token generation helper function
const prisma = new PrismaClient();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "234706959712-86p9g7n7ptk71jb9t96tgdl58a2mije5.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      console.log(profile); // Log the profile to inspect the data returned by Google

      // Check if user already exists in your Prisma database
      let user = await prisma.owner.findUnique({
        where: { email: profile.emails[0].value },
      });
      console.log(user)
      if (!user) {
        // If the user doesn't exist, create a new user
        user = await prisma.owner.create({
          data: {
            email: profile.emails[0].value,
            name: profile.displayName,
            password: "hello" // Set dummy password; actual users won’t need this for OAuth
          }
        });
      }

      // Generate JWT token (you should create a generateToken helper)

      const token = generateToken({ userId : user.id , role: user.role}); // Assuming generateToken generates a JWT based on the user ID

      // Pass the token and user to the callback
      return cb(null, { user, token });
    } catch (error) {
      console.error('Error during Google OAuth callback:', error);
      return cb(error, null); // Call cb with the error
    }
  }
));

