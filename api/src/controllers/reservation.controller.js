const Reservation = require("../models/reservation.model");

const result = {
    reservations: false,
    message: null,
};

exports.createReservation = (req, res) => {
    const data = {
        ...req.body,
        customer: res.locals._id,
    };

    Reservation.create(data)
        .then((reservation) => {
            res.json({ 
                ...result,
                reservations: reservation,
                message: `Create a reservation success`,
            });
        })
        .catch((err) => res.status(500).send(err));
};

exports.getReservations = (req, res) => {
    Reservation.find()
        .populate("customer", ["email", "firstName", "lastName", "_id"])
        .populate("owner", ["email", "firstName", "lastName", "_id"])
        .populate("place", ["title", "_id"])
        .then((reservations) => res.send({
            ...result, 
            reservations: reservations,
            message: `Get reservations success`,
        }))
        .catch((err) => res.status(500).send(err));
};

exports.getReservationById = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            reservation: false,
            message: `Please provide an id`,
        });
    }

    Reservation.findById(id)
        .populate("customer", ["email", "firstName", "lastName", "_id"])
        .populate("place", ["title", "_id"])
        .then((reservation) => {
            if (!reservation) return res.status(404).send({
                reservation: false,
                message: `This reservation doesn't exist`,
            });
            return res.send({ 
                reservation: reservation,
                message: `Get reservation success`,
            });
        })
        .catch((err) => res.status(500).send(err));
};

exports.getUserReservations = (req, res) => {
    const id = res.locals._id;

    if (!id) {
        return res.status(400).json({ 
            reservations: false, 
            message: `Please provide an id`,
        });
    }

    Reservation.find({ customer: id })
        .populate("owner", ["email", "firstName", "lastName", "_id"])
        .populate("place", ["title", "_id"])
        .then((reservations) => {
            if (!reservations) return res.status(404).send({
                reservations: false,
                message: `Reservations not found`,
            });
            return res.send({ 
                reservations: reservations,
                message: `Get user reservations success`,
            });
        })
        .catch((err) => res.status(500).send(err));
};

exports.getUserReservationsRequests = (req, res) => {
    const id = res.locals._id;

    if (!id) {
        return res.status(400).json({
            reservations: false,
            message: `Please provide an id`,
        });
    }

    Reservation.find({ owner: id })
        .populate("customer", ["email", "firstName", "lastName", "_id"])
        .populate("place", ["title", "_id"])
        .then((reservations) => {
            if (!reservations) return res.status(404).send({ 
                reservations: false, 
                message: `Reservations not found`, 
            });
            return res.send({ 
                reservations: reservations, 
                message: `Get user reservations requests success`,
            });
        })
        .catch((err) => res.status(500).send(err));
};

exports.updateReservation = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            updated: false, 
            reservation: false, 
            message: `Please provide an id`,
        });
    }

    Reservation.findByIdAndUpdate([id], req.body, { new: true }, (err, data) => {
        if (err) {
            return res.status(500).send({
                updated: false,
                reservation: false,
                message: err,
            });
        }

        res.json({ 
            updated: true, 
            reservation: data, 
            message: `Update reservation success`,
        });
    });
};

exports.deleteReservation = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ 
            deleted: false, 
            message: `Please provide an id`,
        });
    }

    Reservation.findByIdAndRemove([id], {}, (err) => {
        if (err) return res.status(500).send({
            deleted: false,
            message: err,
        });

        return res.json({
            deleted: true,
            message: `Delete reservation success`,
        });
    });
};
