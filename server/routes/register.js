const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.json({ type: "text/*" }));
const registerController = require("../controllers/registerController");

router.post("/", registerController.handleNewUser);

module.exports = router;
