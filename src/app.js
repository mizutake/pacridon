const express = require('express');
let app = express();

// Middleware settings

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.db = require('./db');

module.exports = app;
