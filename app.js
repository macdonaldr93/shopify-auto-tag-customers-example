var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config/env.js'); // eslint-disable-line node/no-unpublished-require
var shopify = require('./lib/shopify.js');

if (!config.apiKey) {
  throw new Error('Missing API key. Check your config/env.');
} else if (!config.password) {
  throw new Error('Missing password. Check your config/env.');
} else if (!config.store) {
  throw new Error('Missing store. Check your config/env.');
} else if (!config.sharedSecret) {
  throw new Error('Missing shared secret. Check your config/env.');
}

// build authenticated URL based on info provided in config and env
var storeAuth = 'https://' + config.apiKey + ':' + config.password + '@' + config.store + '.myshopify.com';

// setup express server
var app = express();

app.use(morgan('dev'));
app.use(compression());

// verify webhook's origin
app.use(bodyParser.json({
  verify: shopify.validateSignature
}));
app.use(bodyParser.urlencoded({
  verify: shopify.validateSignature,
  extended: true
}));

// block invalid webhook requests
app.use(shopify.requireValidSignature);

// endpoint for Shopify to post order/create event to
app.post('/order_create', function(req, res) {
  // verify conditions to take action
  if (req.body.customer.id && req.body.shipping_address.country_code === 'CA') {
    // update customer
    shopify.updateCustomerTags(storeAuth, req.body.customer.id, ['Canada', 'North America']);
  }

  // return OK to Shopify
  res.sendStatus(200);
});

module.exports = app;
