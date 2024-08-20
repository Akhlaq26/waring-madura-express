const AuthRouter = require("./auth");
const UserRouter = require("./user");
const ProductRouter = require("./product");
const CategoryRouter = require("./category");
const CartRouter = require("./cart");
const TransactionRouter = require("./transaction");
const WebhookRouter = require("./webhook");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, ProductRouter);
  app.use(prefix, CategoryRouter);
  app.use(prefix, CartRouter);
  app.use(prefix, TransactionRouter);
  app.use(prefix, WebhookRouter)
};

module.exports = routes;
