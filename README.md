# Shopify Auto-Tag Customers

An example of a private Shopify app to auto-tagging customers based on order information.

## Requirements

- [Node.js](https://nodejs.org/) 5.x.x or newer
- [ngrok](https://ngrok.com/)
- [Chrome](https://www.google.com/chrome/)
- [Postman Extension](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
- Shopify store

## Setup

### Environment

1. Create a private app in your Shopify store
2. Git clone shopify-auto-tag-customers-example
3. Run npm install 
4. Setup `.env` at the root of shopify-auto-tag-customers

  ```
  API_KEY=xxxxxxxxxxxxxxxxxxx
  PASSWORD=xxxxxxxxxxxxxxxxxxx
  SHARED_SECRET=xxxxxxxxxxxxxxxxxxx
  STORE=xxxxxxxxxxxxxxxxxxx
  ```

### Webhooks

**This step will need to be repeated each time you renew your ngrok tunnel.**

If this is your first time running this, skip to step 4.

1. Get your private app URL with your authentication.

  ![https://screenshot.click/04-17-blo7q-qyr7n.png](https://screenshot.click/04-17-blo7q-qyr7n.png)

2. With Postman, `GET` all your webhooks. (https://apikey:password@hostname/admin/webhooks.json)

  ![https://screenshot.click/04-19-zbsg3-xze9m.png](https://screenshot.click/04-19-zbsg3-xze9m.png)
  
3. Now, if one these webhooks is one that you have already created for this app, you will `PUT` the new address from ngrok.

  ![https://screenshot.click/04-23-hnd81-wvsrz.png](https://screenshot.click/04-23-hnd81-wvsrz.png)
  
  ![https://screenshot.click/04-24-l7pf3-olce7.png](https://screenshot.click/04-24-l7pf3-olce7.png)
  
  ```json
  {
    "webhook": {
      "id": 1111111111,
      "address": "http://64ec84c4.ngrok.io/order_create"
    }
  }
  ```

4. If you're subscribing to a new hook, we will `POST` with the new address from ngrok.

  ![https://screenshot.click/04-23-hnd81-wvsrz.png](https://screenshot.click/04-23-hnd81-wvsrz.png)
  
  ![https://screenshot.click/04-29-rq3do-rgnb7.png](https://screenshot.click/04-29-rq3do-rgnb7.png)
  
  ```json
  {
    "webhook": {
      "address": "http://64ec84c4.ngrok.io/order_create",
      "topic": "orders/fulfilled",
      "format": "json"
    }
  }
  ```

## Usage

1. Run `npm start` to get the local server up. (http://localhost:8000/)
2. Run `npm run tunnel` to get ngrok tunnelling your localhost to the outside world.
3. Setup a webhook on your Shopify store to point to your ngrok url.
