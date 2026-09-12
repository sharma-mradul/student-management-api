const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    token: {
        type: String,
        required: true
    },

    familyId: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["active" , "used" , "revoked"],
        default: "active"
    },

    expiresAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("RefreshToken" , refreshTokenSchema);