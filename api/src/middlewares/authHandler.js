const { verify } = require("jsonwebtoken");
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;
const User = require("../models/user.model");

exports.isAuth = (req, res, next) => {
  const authorisation = req.headers["authorisation"];

  if (!authorisation) {
    return res.status(401).json({
      ok: false,
      message: "Unauthorised user",
    });
  }

  try {
    const token = authorisation.split(" ")[1];
    const payload = verify(token, ACCESS_SECRET);
    res.locals._id = payload._id;
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
      message: "Unauthorised user token",
    });
  }

  return next();
};

exports.isAdmin = (req, res, next) => {
  const authorisation = req.headers["authorisation"];

  if (!authorisation) {
    return res.status(401).json({
      ok: false,
      message: "Unauthorised user",
    });
  }

  try {
    const token = authorisation.split(" ")[1];
    const payload = verify(token, ACCESS_SECRET);

    User.findById(payload._id, ["-password"]);
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
      message: "Unauthorised admin token",
    });
  }

  return next();
};

exports.isRefresh = (req, res, next) => {
  const token = req.cookies["_refresh_cookie"];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Unauthorised user",
    });
  }

  try {
    verify(token, REFRESH_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
      message: "Unauthorised refresh token",
    });
  }
  
  return next();
};
