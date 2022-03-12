"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achievements = void 0;
const mongoose_1 = require("mongoose");
const achievementsSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});
exports.Achievements = (0, mongoose_1.model)("gw2.achievements", achievementsSchema);
