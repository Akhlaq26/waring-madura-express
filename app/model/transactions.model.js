const db = require("../../config/database");

const { Model } = require("objection");
const Cart = require("./cart.model");

Model.knex(db);

class Transaction extends Model {
  static get tableName() {
    return "transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["total_amount", "status"],

      properties: {
        total_amount: {
          type: "number",
        },
        status: {
          type: "string",
        }
      },
    };
  }

  static get relationMappings() {
    const TransactionItem = require('./transaction_items.model');

    return {
      items: {
        relation: Model.HasManyRelation,
        modelClass: TransactionItem,
        join: {
          from: 'transactions.id',
          to: 'transaction_items.transaction_id'
        }
      },
    };
  }
}

module.exports = Transaction;
