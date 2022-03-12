"use strict";
const mongoose_1 = require("mongoose");
const configSchema = new mongoose_1.Schema({
    prefix: {
        type: String,
        required: true,
        default: ">",
    },
    leaders: {
        type: Number,
        required: false,
    },
    officers: {
        type: Number,
        required: false,
    },
    giveawayChannel: {
        type: Number,
        required: false,
    },
    missionsChannel: {
        type: Number,
        required: false,
    },
    starboardChannel: {
        type: Number,
        required: false,
    },
    giveawayRole: {
        type: Number,
        required: false,
    },
});
module.exports = configSchema;
