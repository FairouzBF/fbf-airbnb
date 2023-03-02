const express = require('express');
const router = express.Router();

const { 
    createTypePlace, 
    updateTypePlace, 
    getTypesPlace, 
    getTypePlaceById, 
    deletePlaceType 
} = require("../controllers/typePlace.controller");
const { isAdmin, isAuth } = require("../middlewares/authHandler");

router.post("/typePlace", isAdmin, isAuth, createTypePlace);
router.put("/typePlace/:id", isAdmin, isAuth, updateTypePlace);
router.get("/typePlace", getTypesPlace);
router.get("/typePlace/:id", getTypePlaceById);
router.delete("/typePlace/:id", isAdmin, isAuth, deletePlaceType);

module.exports = router;