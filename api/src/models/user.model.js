const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 2,
    maxLength:50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 2,
    maxLength:50,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  roles: {
    type: [{ type: String, enum: ["user", "owner", "admin"] }],
    default: ["user"],
  },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Place",
    }
  ]
});

userSchema.methods.generateAccessToken = function () {
  const User = this;
  const accessToken = jwt.sign(
    { 
      _id: User._id, 
      roles: User.roles,
    },
    ACCESS_SECRET, 
    {
      expiresIn: "2h",
    },
  );
  return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const User = this;
  const refreshToken = jwt.sign(
    {
      _id: User._id, 
      roles: User.roles 
    }, 
    REFRESH_SECRET, 
    { expiresIn: "30d", }
  );
  return refreshToken;
};

module.exports=mongoose.model('User', userSchema)