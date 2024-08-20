const { body, check, validationResult } = require("express-validator");

const insert = [
  check("product_id").not().isEmpty().withMessage("product_id can not be empty!"),

  check("quantity").not().isEmpty().withMessage("quantity can not be empty!"),
  
  
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
  check("quantity").not().isEmpty().withMessage("quantity can not be empty!"),
  
  check("product_id").isEmpty().withMessage("Cannot change property product_id"),

  body('user_id').custom((value, { req }) => {
    if (value !== undefined && value !== req.user.id) {
      throw new Error('Cannot change property user_id');
    }
    return true;
  }),

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
