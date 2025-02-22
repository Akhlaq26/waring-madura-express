const express = require("express");

const router = express.Router();

const AuthController = require("../app/controller/auth.controller");
const AuthValidator = require("../app/validator/auth.validator");

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *               type: string
 *               example: admin@mail.com
 *              password:
 *               type: string
 *               example: password
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/login", AuthValidator.login, AuthController.login);

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *               type: string
 *               example: Jonatan
 *              email:
 *               type: string
 *               example: admin@example.com
 *              password:
 *               type: string
 *               example: password
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/register", AuthValidator.register, AuthController.register);

/**
 * @openapi
 * /logout:
 *  post:
 *     tags:
 *     - Auth
 *     summary: logout
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/logout", AuthController.logout);


module.exports = router;
