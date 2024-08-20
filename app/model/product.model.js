const db = require("../../config/database");

const { Model } = require("objection");
const Cart = require("./cart.model");

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "price", "stock"],

      properties: {
        name: {
          type: "string",
        },
        price: {
          type: "number",
        },
        stock: {
          type: "number",
        },
        deleted_at: {
          type: "string",
        }
      },
    };
  }

  static get relationMappings() {
    const Category = require('./category.model');

    return {
      categories: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: 'products.id',
          through: {
            from: 'product_categories.product_id',
            to: 'product_categories.category_id'
          },
          to: 'categories.id'
        }
      },
      cart: {
        relation: Model.HasOneRelation,
        modelClass: Cart,
        join: {
          from: 'products.id',
          to: 'cart.product_id',
        }
      },
    };
  }

  async $beforeDelete(queryContext) {
    // Instead of deleting, we'll set the deletedAt field
    console.log('kesini')
    const now = new Date().toISOString();
    await this.$query(queryContext.transaction).patch({ deleted_at: now });

    // Cancel the actual delete operation
    return false;
  }
}

module.exports = Product;
