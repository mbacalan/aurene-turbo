"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Winners = void 0;
const mongoose_1 = require("mongoose");
// TODO: Maybe just use userSchema for winners?
const winnerSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    userTag: {
        type: String,
        required: true,
    },
    item: {
        type: String,
        required: true,
    },
});
exports.Winners = (0, mongoose_1.model)("Winners", winnerSchema);
