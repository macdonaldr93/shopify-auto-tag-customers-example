# Shopify Auto-Tag Customers

An example of a private Shopify app to auto-tagging customers based on order information.

## Requirements

- [Node.js](https://nodejs.org/) 5.xx or newer
- [ngrok](https://ngrok.com/)
- [Chrome](https://www.google.com/chrome/)
- [Postman Extension](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
- Shopify store

## Setup

1. Create a private app in your Shopify store
2. Git clone shopify-auto-tag-customers-example
3. Setup `.env` at the root of shopify-auto-tag-customers
  ```
  API_KEY=xxxxxxxxxxxxxxxxxxx
  PASSWORD=xxxxxxxxxxxxxxxxxxx
  SHARED_SECRET=xxxxxxxxxxxxxxxxxxx
  STORE=xxxxxxxxxxxxxxxxxxx
  ```

## Usage

1. Run `npm start` to get the local server up. (http://localhost:8000/)
2. Run `npm run tunnel` to get ngrok tunnelling your localhost to the outside world.
3. Setup a webhook on your Shopify store to point to your ngrok url.
