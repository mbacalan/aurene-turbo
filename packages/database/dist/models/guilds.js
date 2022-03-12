"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guilds = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("./config"));
const giveaways_1 = __importDefault(require("./giveaways"));
const guildSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    config: {
        type: config_1.default,
        default: () => ({}),
    },
    giveaways: {
        type: [giveaways_1.default],
        required: false,
    },
    giveawayWinners: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Winners" }],
});
exports.Guilds = (0, mongoose_1.model)("guild", guildSchema);
