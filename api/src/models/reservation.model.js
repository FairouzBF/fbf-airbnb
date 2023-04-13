const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        required: true,
        },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        from: {
        type: Date,
        required: true,
        },
        to: {
        type: Date,
        required: true,
        },
    },
});

module.exports = mongoose.model("Reservation", reservationSchema);
