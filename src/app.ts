import * as express from 'express';
import * as session from 'express-session';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as crypto from 'crypto';
import * as bodyParser from 'body-parser';
import * as querystring from 'querystring';
import * as path from 'path';
import * as logger from 'morgan';
import * as config from '../config';
import * as api from './api';

// Build authenticated URL
const storeAuth: string = `https://${config.api_key}:${config.password}@${config.store}.myshopify.com`;
// expres
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'dangerz0ne',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

let env: string = process.env.NODE_ENV || 'development';

app.post('/order_create', (req: express.Request, res: express.Response) => {
  if (req.body.customer.id && req.body.shipping_address.country_code == 'CA') {
    api.updateCustomerTags(storeAuth, req.body.customer.id, ['Canada', 'North America']);
  }
  
  res.sendStatus(200);
});

module.exports = app;
