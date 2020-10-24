//packages
const express = require('express')//backend framework
const mongoose = require('mongoose')//package to connect to mongodb database
const helmet = require('helmet')//middleware: hiding our headers info for security
const morgan = require('morgan')//middleware: api request logger
const cors = require('cors') //middleware: for cross origin resources (e.g. like embed css etc)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config();

//imported routes
const userRoutes = require('./routes/user');

//app
const app = express();//invoking backend framework

//database: using mongoose to connect to mongodb atlas cloud storage
mongoose.connect(process.env.DATABASE, { //processing server URL in .env
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log('MongoDb Connected...') //logging if successful
}).catch(err=> console.log(err));//log if error

//routes middleware
app.use(helmet())//put this on first for security reason
app.use(cors())//invoking cors
app.use(cookieParser())//invoking the cookie parser
app.use("/api", userRoutes); //setting up routes for user only access
app.use(morgan('dev'))//logging on 'dev' for now, change it to 'tiny' later

//cookies
app.get("/", function (req, res) {
  // Cookies that have not been signed
    console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
    console.log("Signed Cookies: ", req.signedCookies);
});

const port = process.env.PORT || 3000; //setting up the port: the || <port> is invoked if PORT is not available

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
