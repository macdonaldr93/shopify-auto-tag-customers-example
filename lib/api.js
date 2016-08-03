var request = require('request-promise');

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
      console.error(err); // eslint-disable-line no-console
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
    .then(function(res) {
      console.log(res); // eslint-disable-line no-console
    })
    .catch(function(err) {
      console.error(err); // eslint-disable-line no-console
    });
}

module.exports = {
  getCustomerTags: getCustomerTags,
  updateCustomerTags: updateCustomerTags
};
