const express = require("express");
const router = express.Router();

const {
  createReservation,
  getReservations,
  getReservationById,
  getUserReservations,
  getUserReservationsRequests,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservation.controller");
const { isAdmin, isAuth } = require("../middlewares/authHandler");

router.post("/reservations", isAuth, createReservation);
router.get("/reservations", isAuth, getReservations);
router.get("/userReservations", isAuth, getUserReservations);
router.get("/requests", isAuth, getUserReservationsRequests);
router.get("/reservations/:id", isAuth, getReservationById);
router.put("/reservations/:id", isAuth, updateReservation);
router.delete("/reservations/:id", isAdmin, isAuth, deleteReservation);

module.exports = router;
