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
        type: String,
        required: false,
    },
    missionsChannel: {
        type: String,
        required: false,
    },
    starboardChannel: {
        type: String,
        required: false,
    },
    giveawayRole: {
        type: Number,
        required: false,
    },
});
module.exports = configSchema;
