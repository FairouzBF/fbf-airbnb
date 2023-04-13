const express = require('express');
const router = express.Router();

const { 
    register,
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
    getUserDetails,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/authHandler");
const { validation, verifyAuth, verifyIdentity } = require("../middlewares/validators");

router.post("/users", verifyAuth, verifyIdentity, validation, register);
router.put("/users/:id", isAuth, updateUser);
router.get("/users", isAuth, getAllUser);
router.get("/user", isAuth, getUserDetails);
router.get("/users/:id", isAuth, getUserById);
router.delete("/users/:id", isAuth, deleteUser);

module.exports = router;