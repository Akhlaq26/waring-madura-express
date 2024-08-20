const BaseController = require('./base.controller');
const Cart = require('../model/cart.model');
const Product = require('../model/product.model');

class CartController extends BaseController {
    static get model() {
      return Cart;
    }

    async getAllByUser(req, res) {
        try {
          let filters = {
            user_id: req.user.id,
          };
          await this.getAll(req, res, 'product', filters);
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: error.message,
          });
        }
    }
    
    async insertCart(req, res) {
        try {
            req.body.user_id = req.user.id
            // update quantity product if cart is exist
            const existing_cart = await this.constructor.model.query()
              .where('user_id', req.user.id)
              .where('product_id', req.body.product_id)
              .withGraphFetched('product')
              .first();

            if (existing_cart) {
              const quantity = existing_cart.quantity + req.body.quantity;
              
              if (quantity > existing_cart.product.stock) {
                return res.status(422).json({ message: 'quantity out of stock' });
              }

              await existing_cart.$query()
              .patch({
                quantity: quantity,
                total_price: quantity * existing_cart.product.price
              })
              
              return res.status(200).json({
                status: 200,
                message: "Success update cart",
                data: existing_cart,
              });
            }

            const product = await Product.query().findById(req.body.product_id);
            if (!product) {
              return res.status(404).json({ message: 'product not found' });
            }
            

            if (req.body.quantity > product.stock)
            {
              return res.status(422).json({ message: 'quantity out of stock' });
            }

            req.body.total_price = product.price * req.body.quantity;
            await this.insert(req, res)
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: error.message,
            });
          }
    }

    async updateCart(req, res){
      try {
        const cart = await this.constructor.model.query().findById(req.params.id).withGraphFetched('product');
        if (!cart) {
          return res.status(404).json({ message: 'cart not found' });
        }
        
        if (req.body.quantity > cart.product.stock)
        {
          return res.status(422).json({ message: 'quantity out of stock' });
        }
        
        req.body.total_price = cart.product.price * req.body.quantity;
        await this.update(req, res)

      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: error.message,
        });
      }
    }
}

module.exports = new CartController();
