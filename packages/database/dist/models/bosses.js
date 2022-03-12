"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bosses = void 0;
const mongoose_1 = require("mongoose");
const bossSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true,
    },
    wiki: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    raidIndex: {
        type: String,
        required: true,
    },
});
exports.Bosses = (0, mongoose_1.model)("gw2.bosses", bossSchema);
