const BaseController = require('./base.controller');
const Category = require('../model/category.model');

class CategoryController extends BaseController {
    static get model() {
      return Category;
    }
    async getAllCategory(req, res) {
        try {
          await this.getAll(req, res, 'products');
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: error.message,
          });
        }
    }

    async getCategory(req, res) {
      try {
        await this.get(req, res, 'products');
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: error.message,
        });
      }
    }

    async associateProduct(req, res) {
      try {
        await this.associateBatch(req, res, req.params.id, 'products', 'product_id', req.body.product_id);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: error.message,
        });
      }
    }
}

module.exports = new CategoryController();
