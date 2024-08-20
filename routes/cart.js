const express = require("express");

const router = express.Router();
const CartValidator = require("../app/validator/cart.validator");
const CartController = require("../app/controller/cart.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const Cart = require("../app/model/cart.model");

/**
 * @openapi
 * /cart:
 *  get:
 *     tags:
 *     - Cart
 *     summary: Get all cart
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
router.get("/cart", AuthMiddleware,(req, res) => CartController.getAllByUser(req, res));

/**
 * @openapi
 * /cart:
 *  post:
 *     tags:
 *     - Cart
 *     summary: Add cart
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - product_id
 *              - quantity
 *            properties:
 *              product_id:
 *               type: number
 *              quantity:
 *               type: number
 *           
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/cart", AuthMiddleware, CartValidator.insert, (req, res) =>  CartController.insertCart(req, res));

/**
 * @openapi
 * /cart/{id}:
 *  put:
 *     tags:
 *     - Cart
 *     summary: Update cart
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the cart
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - quantity
 *            properties:
 *              name:
 *               type: number
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/cart/:id", AuthMiddleware, CartValidator.update, (req, res) =>  CartController.updateCart(req, res));

/**
 * @openapi
 * /cart/{id}:
 *  delete:
 *     tags:
 *     - Cart
 *     summary: Delete cart
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the cart
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/cart/:id", AuthMiddleware, (req, res) => CartController.delete(req, res));

module.exports = router;
