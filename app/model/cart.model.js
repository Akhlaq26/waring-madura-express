const db = require("../../config/database");

const { Model } = require("objection");


Model.knex(db);

class Cart extends Model {
  static get tableName() {
    return "carts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["product_id", "quantity"],
      properties: {
        quantity: {
          type: "number",
        },
        total_price: {
          type: "number",
        }
      },
    };
  }


  static get relationMappings() {
    const Product = require("./product.model");
    const User = require("./user.model");
    
    return {
      product: {
        relation: Model.HasOneRelation,
        modelClass: Product,
        join: {
          from: 'carts.product_id',
          to: 'products.id'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'carts.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Cart;
