"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = require("mongoose");
const users_1 = __importDefault(require("./users"));
const giveawaySchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userTag: {
        type: String,
        required: true,
    },
    creationTime: {
        type: Date,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    entries: {
        type: [users_1.default],
        required: false,
    },
});
module.exports = giveawaySchema;
