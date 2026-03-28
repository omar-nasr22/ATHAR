const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.post("/complete", orderController.completeOrder);
router.get("/download/:token", orderController.downloadBook);

module.exports = router;
