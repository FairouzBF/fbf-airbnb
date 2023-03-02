const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const placeRouter = require('./place.route');
const reservationRouter = require('./reservation.route');
const typePlaceRouter = require('./typePlace.route');
const userRouter = require('./user.route');

router.use('/auth', authRouter);
router.use('/place', placeRouter);
router.use('/reservation', reservationRouter);
router.use('/typePlace', typePlaceRouter);
router.use('/user', userRouter);

module.exports = router;