const BaseController = require('./base.controller');
const User = require('../model/user.model');
const bcrypt = require("bcryptjs/dist/bcrypt");

class UserController extends BaseController {
  static get model() {
    return User;
  }

  async update(req, res) {
    try {
      const data = { ...req.body };
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      const user = await this.constructor.model.query().findById(req.params.id).patch(data);
      res.status(200).json({
        status: 200,
        message: "Success update!",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}

module.exports = new UserController();
