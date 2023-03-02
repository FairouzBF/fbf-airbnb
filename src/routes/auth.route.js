const express = require("express");
const router = express.Router();

const { isRefresh, isAuth } = require("../middlewares/authHandler");
const { loginUser, refreshToken, logoutUser } = require("../controllers/auth.controller.js");

router.post("/auth/login", loginUser);
router.post("/refreshToken", isRefresh, refreshToken);
router.post("/logout", isAuth, logoutUser );

module.exports = router;