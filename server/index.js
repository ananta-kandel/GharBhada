const express = require('express');
const bodyParser = require('body-parser') ;
require('dotenv').config();
const app = express();
const cors = require('cors')
const passport = require('passport');

app.use(express.json());
app.use(cors())

app.use(passport.initialize());
require('./src/middlewares/passport'); // Load Passport strategies


const  userAuthentication = require('./src/routes/userRoutes/userAuthentication')
const ownerBasic = require("./src/routes/ownerRoutes/ownerBasic")
app.use("/",userAuthentication)
app.use("/owner",ownerBasic)

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }), 
  (req, res) => {
    // Successful authentication, return JWT token and user details
    res.json({
      token: req.user.token,  // JWT token generated in the strategy
      user: req.user.user     // User details from the strategy
    });
  }
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
