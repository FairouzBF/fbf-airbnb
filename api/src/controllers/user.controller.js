const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const refreshTokenCookie = require("../utils/refreshTokenCookie.js");
const userService = require("../services/user.service");

const result = {
  users: false,
  message: null,
};

exports.register = (req, res) => {
  const body = req.body;

  const newUser = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password),
  });

  newUser
    .save()
    .then((user) => {
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      refreshTokenCookie(res, refreshToken);
      res.json({
        ok: true,
        accessToken: accessToken,
        message: `Create user success`, 
      });
    })
    .catch((err) => {
      res.status(500).send({
        ok: false,
        accessToken: false,
        message: err,
      });
    });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!id) {
    return res.status(400).json({
      user: false,
      message: `Please provide an id`,
    });
  }

  const updatedUser = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password),
  };

  User.findByIdAndUpdate(id, updatedUser, { new: true }, (err, data) => {
    if (err) {
      return res.status(500).send({
        update: false,
        message: err,
      });
    }
    if (!data) return res.status(404).send({ 
      updated: false, 
      place: false, 
      message: `This user doesn't exist`,
    });

    res.json({
      updated: true,
      user: data,
      message: `Update user success`,
    });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      deleted: false,
      message: `Please provide an id`,
    });
  }

  User.findByIdAndRemove(id, (err, data) => {
    if (err) {
      return res.status(500).send({
        deleted: false,
        message: err,
      });
    }
    if (!data) return res.status(404).send({
      updated: false,
      place: false,
      message: `This user doesn't exist.`,
    });

    res.json({
      deleted: true,
      message: `Delete user success`,
    });
  });
};

exports.getAllUser = async (req, res) => {
  let data;
  try {
    data = await userService.getUsers();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ...result,
      message: `An error happened`,
    });
  }

  if (!data) return res.status(500).json({
    ...result,
    message: `An error happened`,
  });

  res.send({
    ...result,
    users: data,
    message: `Find all users success`,
  });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  let data;
  try {
    data = await userService.getUser(id);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ...result,
      message: `An error happened`,
    });
  }

  if (!data) return res.status(404).send({
    updated: false,
    place: false,
    message: `User doesn't exist`,
  });

  res.send({
    ...result,
    users: data,
    message: `Find user by id success`,
  });
};

exports.getUserDetails = async (req, res) => {
  let data;
  try {
    data = await userService.getUser(res.locals._id);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      user: false,
      message: `An error happened`,
    });
  }

  if (!data) return res.status(404).send({
    updated: false,
    place: false,
    message: `User doesn't exist`,
  });

  res.send({
    user: data,
    message: `Getting details success`,
  });
};