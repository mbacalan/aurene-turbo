"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worlds = void 0;
const mongoose_1 = require("mongoose");
const worldSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    population: {
        type: String,
        required: false,
    },
});
exports.Worlds = (0, mongoose_1.model)("gw2.worlds", worldSchema);
