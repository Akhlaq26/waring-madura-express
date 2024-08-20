const Transaction = require('../model/transactions.model');
const Cart = require('../model/cart.model');
const bcrypt = require("bcryptjs/dist/bcrypt");
const constant = require('../../utils/constant');
const Product = require('../model/product.model');
const BaseController = require('./base.controller');

class TransactionController extends BaseController {
  static get model() {
    return Transaction;
  }

  async checkout(req, res) {
    try {
      const model = this.constructor.model;
      await model.knex().transaction(async trx => {
          // get cart
          let query = Cart.query()
          .withGraphFetched('product')
          .where('user_id', req.user.id)

          if (req.body.cart_ids){
            query = query.whereIn('id', req.body.cart_ids)
          }

          const cart = await query.transacting(trx);

          if (!cart) {
            return res.status(422).json({
              status: 422,
              message: "Cart is Empty",
            });
          }

          //update product stock 
          for (const item of cart) {
            const product = await Product.query(trx)
              .findById(item.product_id)
              .forUpdate();
            
            // check if there is changes on product stock
            if (item.quantity > product.stock)
            {
              return res.status(422).json({ message: 'quantity out of stock' });
            }

            await product.$query(trx)
              .patch({
                stock: product.stock - item.quantity
              })
              .transacting(trx);
          }
          
          const totalAmount = cart.reduce((sum, el) => sum + el.total_price, 0);
          const items = cart.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            total_price: item.total_price
          }));
          
          await model.query().insertGraph(
            [
              {
                total_amount: totalAmount,
                status: constant.TRANSACTION_STATUS.PENDING,
                user_id : req.user.id,
                items: items
              }
            ]
          ).transacting(trx);

          await Cart.query()
              .delete()
              .whereIn('id', cart.map(el => el.id))
              .transacting(trx);
      });
      
      res.status(200).json({
        status: 200,
        message: "Success",
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async getAllByUser(req, res) {
    try {
      let filters = {
        user_id: req.user.id,
      };
      await this.getAll(req, res, 'items', filters);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
}
}

module.exports = new TransactionController();