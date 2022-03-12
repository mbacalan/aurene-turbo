"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keys = void 0;
const mongoose_1 = require("mongoose");
const keySchema = new mongoose_1.Schema({
    discordId: {
        type: String,
        required: true,
    },
    keyName: {
        type: String,
        required: false,
    },
    accountName: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String],
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
});
exports.Keys = (0, mongoose_1.model)("Keys", keySchema);
