const express = require("express");

const router = express.Router();
const ProductValidator = require("../app/validator/product.validator");
const ProductController = require("../app/controller/product.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const Product = require("../app/model/product.model");

/**
 * @openapi
 * /product:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get all product
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
router.get("/product", AuthMiddleware, (req, res) => ProductController.getAllProduct(req, res));
/**
 * @openapi
 * /product:
 *  post:
 *     tags:
 *     - Product
 *     summary: Add product
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - price
 *              - stock
 *            properties:
 *              name:
 *               type: string
 *              price:
 *               type: number
 *              stock:
 *               type: number
 *              categories:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: id of category.
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

router.post("/product", AuthMiddleware, ProductValidator.insert, (req, res) =>  ProductController.upsertProduct(req, res));

/**
 * @openapi
 * /product/{id}:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get product
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the product
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/product/:id", AuthMiddleware, (req, res) =>  ProductController.getProduct(req, res));

/**
 * @openapi
 * /product/{id}:
 *  delete:
 *     tags:
 *     - Product
 *     summary: Delete product
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the product
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/product/:id", AuthMiddleware, (req, res) => ProductController.delete(req, res));


module.exports = router;
