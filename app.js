var express = require('express');
var session = require('express-session');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var config = require('./config/env.js'); // eslint-disable-line node/no-unpublished-require
var api = require('./lib/api.js');
var shopify = require('./lib/shopify.js');

// Build authenticated URL based on info provided in config and env
var storeAuth = 'https://' + config.apiKey + ':' + config.password + '@' + config.store + '.myshopify.com';

// Setup express server
var app = express();
app.use(logger('dev'));
app.use(compression());
// Verify webhook's origin
app.use(bodyParser.json({
  verify: shopify.validateSignature
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'dangerz0ne',
  resave: false,
  saveUninitialized: true
}));
// Block invalid webhook requests
app.use(shopify.requireValidSignature);

// Endpoint for Shopify to post order/create event to
app.post('/order_create', function(req, res) {
  // Verify conditions to take action
  if (req.body.customer.id && req.body.shipping_address.country_code === 'CA') {
    // Update customer
    api.updateCustomerTags(storeAuth, req.body.customer.id, ['Canada', 'North America']);
  }

  // Return OK to Shopify
  res.sendStatus(200);
});

module.exports = app;
