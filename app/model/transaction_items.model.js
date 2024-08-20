const db = require("../../config/database");

const { Model } = require("objection");
const Cart = require("./cart.model");

Model.knex(db);

class TransactionItem extends Model {
  static get tableName() {
    return "transaction_items";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "price", "quantity"],

      properties: {
        name: {
          type: "string",
        },
        quantity: {
          type: "number",
        },
        price: {
          type: "number",
        },
        total_price: {
          type: "number",
        },
      },
    };
  }
}

module.exports = TransactionItem;
