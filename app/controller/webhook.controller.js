const BaseController = require('./base.controller');
const Webhook = require('../model/user.model');
const bcrypt = require("bcryptjs/dist/bcrypt");
const Transaction = require('../model/transactions.model');
const constant = require('../../utils/constant');

class WebhookController {

  async webhookPayment(req, res) {
    try {
      const body = { ...req.body };
      const transaction = await Transaction.query().findById(body.transaction_id)

      if (transaction.status !== body.status){
        await transaction.$query()
        .patch({
          status: body.status
        })
      }
        
      res.status(200).json({
        status: 200,
        message: "Success",
        data: transaction,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new WebhookController();
