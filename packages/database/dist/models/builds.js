"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builds = void 0;
const mongoose_1 = require("mongoose");
const buildSchema = new mongoose_1.Schema({
    build: {
        type: String,
        required: true,
        index: true,
    },
});
exports.Builds = (0, mongoose_1.model)("gw2.builds", buildSchema);
