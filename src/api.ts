import * as request from 'request-promise';

let subscribeToWebhook = (storeAuth: string, topic: string, address: string) => {
  let endpoint: string = `${storeAuth}/admin/webhooks.json`;
  let options: request.Options = {
    method: 'POST',
    uri: endpoint,
    body: {
      'webhook': {
        'topic': topic,
        'address': address,
        'format': 'json'
      }
    },
    json: true
  };

  return request(options)
    .then((res: any) => {
      console.log(res);
    })
    .catch((res: any) => {
      console.error(res);
    });
};

let unsubscribeFromWebhook = (storeAuth: string, id: number) => {
  let endpoint: string = `${storeAuth}/admin/webhooks/${id}.json`;
  let options: request.Options = {
    method: 'DELETE',
    uri: endpoint,
    json: true
  };

  return request(options)
    .then((res: any) => {
      console.log(res);
    })
    .catch((res: any) => {
      console.error(res);
    });
};

let getWebhooks = (storeAuth: string) => {
  let endpoint: string = `${storeAuth}/admin/webhooks.json`;
  let options: request.Options = {
    method: 'get',
    uri: endpoint,
    json: true
  };

  return request(options)
    .then((res: any) => {
      console.log(res);
    })
    .catch((res: any) => {
      console.error(res);
    });
};

let getCustomerTags = (storeAuth: string, customerId: number) => {
  let endpoint: string = `${storeAuth}/admin/customers/${customerId}.json`;
  let options: request.Options = {
    method: 'GET',
    uri: endpoint,
    json: true
  };

  return request(options)
    .then((res: any) => {
      let tags = res.customer.tags.split(', ');
      return tags;
    })
    .catch((err: any) => {
      console.error(err);
    });
};

let updateCustomerTags = (storeAuth: string, customerId: number, tags: string[]) => {
  let endpoint: string = `${storeAuth}/admin/customers/${customerId}.json`;
  let options: request.Options = {
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
    .then((existingTags: string) => {
      options.body.customer.tags = existingTags.length > 0 ? existingTags + ',' + tags.join(',') : tags.join(',');
      return request(options);
    })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.error(err);
    });
};

module.exports = {
  subscribeToWebhook: subscribeToWebhook,
  unsubscribeFromWebhook: unsubscribeFromWebhook,
  getWebhooks: getWebhooks,
  getCustomerTags: getCustomerTags,
  updateCustomerTags: updateCustomerTags
};
