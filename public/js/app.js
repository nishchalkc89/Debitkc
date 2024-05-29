var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp', { useNewUrlParser: true });
var db = mongoose.connection;
 
 
var app = express();
 
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
 
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
// Define routes
app.get('/', (req, res) => {
  // Render your HTML file
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/list', usersRouter);
 
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
res.json({
  message: err.message,
  error: err
});

});

module.exports = app;

 
// port must be set to 5000 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 

