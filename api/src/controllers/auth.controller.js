const { login } = require("../services/auth.service.js");
const User = require("../models/user.model.js");
const refreshTokenCookie = require("../utils/refreshTokenCookie");
const { REFRESH_SECRET } = process.env;

let result = {
  accessToken: null,
  ok: false,
  message: null
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const loginResult = await login(email, password, res);
    res.send(loginResult);
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = (req, res) => {
  const token = req.cookies._refresh_cookie;
  let payload = null;
  if (!token) {
    return res.status(403).json({
      ...result,
      message: "Please provide a token",
    });
  }

  try {
    payload = verify(token, REFRESH_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
      accessToken: "",
    });
  }

  User.findById(payload._id)
    .then((user) => {
      if (!user)
        return res.status(400).json({
          ok: false,
          accessToken: null,
          message: "User not found",
        });

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      refreshTokenCookie(res, refreshToken);

      res.json({
        ok: true,
        accessToken: accessToken,
        roles: user.roles,
        userId: user._id,
        message: "Log in success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        ok: false,
        accessToken: null,
        message: err,
      });
    });
};

exports.logoutUser = (req, res) => {
  refreshTokenCookie(res, "");

  res.json({
    ...result,
    ok: true,
    accessToken: "",
    message: "Log out success",
  });
};
