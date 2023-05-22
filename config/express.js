var express = require('express');
var load = require('express-load');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

module.exports = function () {
    var app = express();
    app.use('/public', express.static('public'));
    app.set('view engine', 'ejs');
    app.use(session({
        secret: 'cheiodesal',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cors()).use(cookieParser());
    load('routes').then('infra').into(app);
    return app;
}