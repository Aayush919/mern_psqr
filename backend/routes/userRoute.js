
const express = require("express");
const { registerUser, authUser } = require("../controller/userController");
const router = express.Router();



router.post("/signup", registerUser);
router.post("/auth", authUser);

module.exports = router;