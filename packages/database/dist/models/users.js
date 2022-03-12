"use strict";
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    userTag: {
        type: String,
        required: true,
    },
});
module.exports = userSchema;
