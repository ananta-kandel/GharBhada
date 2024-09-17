const express = require('express');
const bodyParser = require('body-parser') ;
require('dotenv').config();
const app = express();

app.use(express.json());

const  userAuthentication = require('./src/routes/userRoutes/userAuthentication')
const ownerBasic = require("./src/routes/ownerRoutes/ownerBasic")
app.use("/",userAuthentication)
app.use("/owner",ownerBasic)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
