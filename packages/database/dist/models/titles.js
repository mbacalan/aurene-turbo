"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Titles = void 0;
const mongoose_1 = require("mongoose");
const titleSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
exports.Titles = (0, mongoose_1.model)("gw2.titles", titleSchema);
