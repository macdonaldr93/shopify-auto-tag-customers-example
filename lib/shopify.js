var crypto = require('crypto');
var config = require('../config/env.js'); // eslint-disable-line node/no-unpublished-require
var debug = require('debug')('shopify');

module.exports = {
  requireValidSignature: function(req, res, next) {
    debug('Valid Signature?', req.validShopifyWebhook);

    if (!req.validShopifyWebhook) {
      return res.sendStatus(403);
    } else {
      return next();
    }
  },
  validateSignature: function(req, res, buffer) {
    req.validShopifyWebhook = false;
    var headerHmac = req.headers['x-shopify-hmac-sha256'];

    if (headerHmac) {
      var hmac = crypto.createHmac('sha256', config.sharedSecret);
      hmac.update(buffer);
      var calculatedHmac = hmac.digest('base64');
      if (calculatedHmac === headerHmac) {
        req.validShopifyWebhook = true;
      }
    }
  }
};
