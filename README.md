## config ##
module.exports = {
  URI: "mongodb+srv://shawnzeysyed_db_user:syed.shawn@cluster2.ddaokjb.mongodb.net/Expenses"
};
##
## models ##
let mongoose = require("mongoose");

// create a model
let expenseModel = mongoose.Schema(
    {
        type: String,
        amount: Number,
        date: String,
    },
    {
        collection: "Spent.expenses"
    }
);

module.exports = mongoose.model("ExpenseTracker", expenseModel);
## node_modules##
## Public folder##
## app.css##
/* custom css goes here */
body {
  background-color: rgb(64, 159, 160) !important;
}
## routes ##
## expense.js##
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Expenses = require('../models/expenses');

// READ all expenses
router.get('/', async (req, res, next) => {
    try {
        const expenseList = await Expenses.find();
        console.log(expenseList);

        // send list to browser
        res.json(expenseList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error reading expenses");
    }
});

module.exports = router;
##
## index.js##
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'Expense Tracker'
   });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { 
    title: 'Contact us'
   });
});

module.exports = router;
##
## user.js##
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is a user page');
});

module.exports = router;
##
## Views##
##error.ejs##
<h1><%= message %></h1>
<h2><%= error.status %></h2>
<pre><%= error.stack %></pre>
##
##expense.ejs##
<!-- Navigation Bar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Expense Tracker</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home">
            <i class="fa-solid fa-lg fa-dollar-sign"></i> Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/contact">
            <i class="fa-solid fa-envelope"></i> Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Main content to display the database -->
<main class="container">
  <div class="row">
    <div class="offset-md-1 col-md-10">
      <h1><%= title %></h1>
      <br>
      <table class="table table-bordered table-striped table-hover">
        <tr class="d-flex">
          <th class="text-center col-2">Type</th>
          <th class="text-center col-2">Amount</th>
          <th class="text-center col-2">Date</th>
        </tr>
      </table>
    </div>
  </div>
</main>

<!-- Footer -->
<nav class="navbar fixed-bottom navbar-light bg-light">
  <a class="navbar-brand" href="#">&copy; COPYRIGHT 2025. SS</a>
</nav>

##
##index.ejs##
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <!--this is css file-->
<link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="/Content/stylesheets/app.css" />
<link rel="stylesheet" href="/@fortawesome/fontawesome-free/css/all.min.css" />
</head>
<body>
<!--Navigation Bar-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Expense Tracker</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home"><i class="fa-solid fa-lg fa-dollar-sign"></i> Home</a>
        </li>
     
         <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/contact"><i class="fa-solid fa-envelope"></i> Contact</a>
        </li>

    </div>
  </div>
</nav>
<!--Content of the webpage-->
  <h3 class="text-white">Welcome to the <%= title %> page</h3>
  <!--this is the footer-->
  <nav class="navbar fixed-bottom navbar-light bg-light">
    <a class="navbar-brand" href="#">&copy; COPYRIGHT 2025. SS</a>
  </nav>
  <!--this is the script file-->
  <script src = "/Scripts/app.js"></script>
  <script src = "/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src = "/jquery/dist/jquery.min.js"></script>


</body>
</html>
##
##app.js ##
/* installed 3rd party packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let DB = require('./config/db');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let expenseRouter = require('./routes/expense');
const db = require('./config/db');

let app = express();

// Test DB connection
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console,'Connection error'));
mongoDB.once('open',()=>{
  console.log('Connected to the MongoDB');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/expenses',expenseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
##
## packajelock.json##
##packagje.json##
{
  "name": "assignment3",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./server.js"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^7.1.0",
    "bootstrap": "^5.3.8",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jquery": "^3.7.1",
    "mongoose": "^9.0.0",
    "morgan": "~1.9.1"
  }
  ##
  ## server.js##
  #!/usr/bin/env node

/**
 * Module dependencies.
 */

/* 
Create, Read, Update, Delete -- CRUD operation
*/

var app = require('./app');
var debug = require('debug')('assignment3:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
###
<img width="954" height="1007" alt="image" src="https://github.com/user-attachments/assets/e585cb98-465b-4078-9baa-4a10a0369e17" />
<img width="1919" height="1015" alt="image" src="https://github.com/user-attachments/assets/4858a82d-ff2f-4ea9-a0e5-d831516a79fd" />





