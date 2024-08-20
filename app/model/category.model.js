const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name"],

      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        }
      },
    };
  }

  static get relationMappings() {
    const Product = require('./product.model');

    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'categories.id',
          through: {
            from: 'product_categories.category_id',
            to: 'product_categories.product_id'
          },
          to: 'products.id'
        }
      }
    };
  }
}

module.exports = Category;
