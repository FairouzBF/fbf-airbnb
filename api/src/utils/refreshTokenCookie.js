const refreshTokenCookie = (res, token) => {
  res.cookie("_refresh_cookie", token, {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    path: "/api/refreshToken",
    sameSite: "Strict",
    maxAge: 7200000,
  });
};

module.exports = refreshTokenCookie;