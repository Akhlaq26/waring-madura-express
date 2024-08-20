const express = require("express");

const router = express.Router();
const CategoryValidator = require("../app/validator/category.validator");
const CategoryController = require("../app/controller/category.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /category:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get all category
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
router.get("/category",AuthMiddleware, (req, res) => CategoryController.getAllCategory(req, res));

/**
 * @openapi
 * /category:
 *  post:
 *     tags:
 *     - Category
 *     summary: Add category
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
 *              - description
 *            properties:
 *              name:
 *               type: string
 *              description:
 *               type: string
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


router.post("/category", AuthMiddleware, CategoryValidator.insert, (req, res) =>  CategoryController.insert(req, res));

/**
 * @openapi
 * /category/{id}:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/category/:id", AuthMiddleware, (req, res) =>  CategoryController.getCategory(req, res));

/**
 * @openapi
 * /category/{id}:
 *  put:
 *     tags:
 *     - Category
 *     summary: Update category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *               type: string
 *              description:
 *               type: string
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
router.put("/category/:id", AuthMiddleware, CategoryValidator.update, (req, res) =>  CategoryController.update(req, res));

/**
 * @openapi
 * /category/{id}:
 *  delete:
 *     tags:
 *     - Category
 *     summary: Delete category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/category/:id", AuthMiddleware, (req, res) => CategoryController.delete(req, res));

/**
 * @openapi
 * /category/:id/associate:
 *  delete:
 *     tags:
 *     - Category
 *     summary: associate category to another entity
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the category
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - product_id
 *            properties:
 *              product_id:
 *               type: array
 *               items:
 *                type: integer
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/category/:id/associate", AuthMiddleware, (req, res) => CategoryController.associateProduct(req, res));

module.exports = router;
