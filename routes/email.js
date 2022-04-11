const express = require("express");
const { sendEmail } = require("../controllers/email");
const router = express.Router();
const error = require("../middlewares/error");



router.post("/send-email", error(sendEmail));

module.exports = router;
