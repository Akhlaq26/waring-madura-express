const BaseController = require('./base.controller');
const Product = require('../model/product.model');

class ProductController extends BaseController {
    static get model() {
        return Product;
    }

    async getAllProduct(req, res) {
        try {
          await this.getAll(req, res, 'categories');
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: error.message,
          });
        }
    }

    async getProduct(req, res) {
        try {
          await this.get(req, res, 'categories');
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: error.message,
          });
        }
    }
    
    async upsertProduct(req, res) {
        try {
            const data = { ...req.body };
            // insert data
            const item = await Product.query().upsertGraph (
            [data],
            {
              relate: true
            });
            res.status(200).json({
              status: 200,
              data: item,
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: error.message,
            });
          }
    }
}

module.exports = new ProductController();
