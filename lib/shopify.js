var request = require('request-promise');
var crypto = require('crypto');
var config = require('../config/env.js'); // eslint-disable-line node/no-unpublished-require
var debug = require('debug')('shopify');

function requireValidSignature(req, res, next) {
  debug('Valid Signature?', req.validShopifyWebhook);

  if (req.validShopifyWebhook) {
    return next();
  } else {
    return res.sendStatus(403);
  }
}

function validateSignature(req, res, buffer) {
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

function getCustomerTags(storeAuth, customerId) {
  var endpoint = storeAuth + '/admin/customers/' + customerId + '.json';
  var options = {
    method: 'GET',
    uri: endpoint,
    json: true
  };

  return request(options)
    .then(function(res) {
      var tags = res.customer.tags.split(', ');
      return tags;
    })
    .catch(function(err) {
      debug('Get customer tags', err);
    });
}

function updateCustomerTags(storeAuth, customerId, tags) {
  var endpoint = storeAuth + '/admin/customers/' + customerId + '.json';
  var options = {
    method: 'PUT',
    uri: endpoint,
    body: {
      customer: {
        id: customerId,
        tags: ''
      }
    },
    json: true
  };

  return getCustomerTags(storeAuth, customerId)
    .then(function(existingTags) {
      options.body.customer.tags = existingTags.length > 0 ? existingTags + ',' + tags.join(',') : tags.join(',');
      return request(options);
    })
    .catch(function(err) {
      debug('Update customer tags', err);
    });
}

module.exports = {
  requireValidSignature: requireValidSignature,
  validateSignature: validateSignature,
  getCustomerTags: getCustomerTags,
  updateCustomerTags: updateCustomerTags
};
