const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemController");

router.post("/", itemsController.handleNewItem);
router.post("/get", itemsController.handleGetItem);

module.exports = router;
