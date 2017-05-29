var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');


var app = express();
var server = app.listen(4000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// import ioredis
var Redis = require('ioredis');


// connect to the databse
var redis = new Redis('18685', 'redis-18685.c13.us-east-1-3.ec2.cloud.redislabs.com', {password: '123456'});


app.use('/show', showData);
app.use('/add', addData);
app.use('/sub', subData);
app.use('/clear', clearData);

function showData(request, response) {
    // get the value for key "count"
    redis.get('count', function (err, result) {
        console.log('re' + result);
        response.send(JSON.stringify({count: Number(result)}));
    });
}

function addData(request, response) {
    //var aValue = request.param('val');
     var aValue = request.body.num;
     console.log(aValue);
    // get count
    redis.get('count', function (err, result) {
        aValue = Number(aValue) + Number(result);
        // reset count value
        redis.set('count', Number(aValue), function () {
            response.send(JSON.stringify({'count': aValue, 'status': 'success'}));
        })
    });


}

function subData(request, response) {
    //var aValue = request.param('val');
    var aValue = request.body.num;
    console.log(aValue);
    // get count
    redis.get('count', function (err, result) {
        aValue = Number(result) - Number(aValue);
        // reset count value
        redis.set('count', Number(aValue), function () {
            response.send(JSON.stringify({'count': aValue, 'status': 'success'}));
        })
    });


}

function clearData(request, response) {
    redis.set('count', 0, function () {
        response.send(JSON.stringify({'count': 0, 'status': 'success'}));
    })
}

// show pages
app.use('/', index);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

