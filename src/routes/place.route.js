const express = require('express');
const router = express.Router();
const { 
    createPlace, 
    getPlaces, 
    getUserPlaces,
    getMyPlaces,
    getPlaceById, 
    updatePlace, 
    deleteMyPlace 
} = require('../controllers/place.controller');
const { isAuth, isAdmin } = require("../middlewares/authHandler");

router.post("/places", isAuth, createPlace);
router.get("/places", getPlaces);
router.get("/userPlaces", isAuth, getUserPlaces);
router.get("/myPlaces", isAuth, getMyPlaces);
router.get("/places/:id", getPlaceById);
router.put("/place/:id", isAuth, updatePlace);
router.delete("/place/:id", isAdmin, isAuth, deleteMyPlace);

module.exports = router;