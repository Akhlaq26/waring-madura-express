const express = require("express");

const router = express.Router();

const WebhookController = require("../app/controller/webhook.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /webhook/payment:
 *  get:
 *     tags:
 *     - Webhook
 *     summary: webhook payment status
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
router.post("/webhook/payment", AuthMiddleware, (req, res) =>  WebhookController.webhookPayment(req, res));

module.exports = router;
