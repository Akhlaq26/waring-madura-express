const express = require("express");

const router = express.Router();

const UserController = require("../app/controller/user.controller");
const UserValidator = require("../app/validator/user.validator");
const AuthMiddleware = require("../middleware/auth.middleware");
const User = require("../app/model/user.model");

/**
 * @openapi
 * /user:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all user
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
router.get("/user", AuthMiddleware, (req, res) =>  UserController.getAll(req, res));

/**
 * @openapi
 * /user/{id}:
 *  get:
 *     tags:
 *     - User
 *     summary: Get user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/user/:id", AuthMiddleware, (req, res) =>  UserController.get(req, res));

/**
 * @openapi
 * /user/{id}:
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/user/:id", AuthMiddleware, (req, res) => UserController.delete(req, res));

module.exports = router;
