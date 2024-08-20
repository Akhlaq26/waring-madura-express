const { check, validationResult } = require("express-validator");

const insert = [
  check("name").not().isEmpty().withMessage("name can not be empty!"),

  check("stock").not().isEmpty().withMessage("stock can not be empty!"),

  check("price").not().isEmpty().withMessage("price can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(400).json({
        errors: error_data,
      });

    next();
  },
];

const update = [
  check("name").not().isEmpty().withMessage("name can not be empty!"),

  check("stock").not().isEmpty().withMessage("stock can not be empty!"),

  check("price").not().isEmpty().withMessage("price can not be empty!"),


  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(400).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  insert,
  update,
};
