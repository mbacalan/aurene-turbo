"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specializations = void 0;
const mongoose_1 = require("mongoose");
const specializationsSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    elite: {
        type: Boolean,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    },
    professionIcon: {
        type: String,
        required: false,
    },
});
exports.Specializations = (0, mongoose_1.model)("gw2.specializations", specializationsSchema);
