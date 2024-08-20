const express = require("express");

const router = express.Router();

const TransactionController = require("../app/controller/transaction.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /checkout:
 *  get:
 *     tags:
 *     - Transaction
 *     summary: checkout transaction from cart
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              cart_ids:
 *               type: array
 *               items:
 *                type: integer
 *                description: Specific cart id
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/checkout", AuthMiddleware, (req, res) =>  TransactionController.checkout(req, res));

/**
 * @openapi
 * /transaction:
 *  get:
 *     tags:
 *     - Transaction
 *     summary: get all transaction
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
 router.get("/transaction", AuthMiddleware, (req, res) =>  TransactionController.getAllByUser(req, res));


module.exports = router;
