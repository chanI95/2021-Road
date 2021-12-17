const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')
const dotenv = require('dotenv');
const session = require('express-session')
const cors = require('cors');

dotenv.config({ path: './.env'})


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extends:true}));
app.use(bodyParser.json());

// creates a session class
app.use(session({
  secret: "DBMS mini project",
  resave: false,
  saveUninitialized: false
}));





// 순서대로 경로 연결
const google = require('./routes/google.js');
app.use('/', google);


// POSTMAN GET POST (암호화 아이디 비번 회원가입 로그인 가능)
// http://localhost:3000/api/join
// http://localhost:3000/api/login
const router = require('./routes/router.js');
app.use('/api', router);

const join = require('./routes/join.js');
app.use('/api', join);

// http://localhost:3000/index
const index = require('./routes/index');
app.use('/index', index);


// http://localhost:3000/introduction
const introduction = require('./routes/introduction.js');
app.use('/introduction', introduction);


// http://localhost:3000/map/
const map = require('./routes/map.js')
app.use('/map', map);

// http://localhost:3000/drink/page=1
const drink = require('./routes/drink.js');
app.use('/drink', drink);
//
//
// http://localhost:3000/board
const boardRouter = require('./routes/board.js');
app.use('/board', boardRouter);
//
 // http://localhost:3000/mbti
 const mbti = require('./routes/mbti.js');
 app.use('/mbti', mbti);


// =================
//   AUTH FUNCTION
// =================
function isLoggedIn (req, res, next) {
  if(req.session.user){
    return next();
  } else {
    res.redirect("/login");
  }
}

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
