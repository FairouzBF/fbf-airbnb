const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const refreshTokenCookie = require("../utils/refreshTokenCookie");
const throwError = require("../utils/throwError");

exports.login = async (email, password, res) => {
  const user = await User.findOne({ email }, ["_id", "email", "password", "firstName", "lastName", "roles"]);
  if (!user) throwError(404, `This user doesn't exist`);

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throwError(400, `Invalid password`);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  refreshTokenCookie(res, refreshToken);

  return {
    ok: true,
    data: {
      accessToken: accessToken,
      roles: user.roles,
      userId: user._id,
    },
    status: 200,
    message: `Log in success`,
  };
};