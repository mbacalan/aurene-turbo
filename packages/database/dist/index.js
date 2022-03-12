"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = require("mongoose");
// import { logger } from "./";
(0, mongoose_1.connect)(process.env.MONGO_URI || "mongodb://localhost:27017/local");
const db = mongoose_1.connection;
exports.db = db;
db.on("error", () => console.error("Error connecting to database"));
db.once("open", () => console.info("Successfully connected to database"));
__exportStar(require("./models/achievements"), exports);
__exportStar(require("./models/bosses"), exports);
__exportStar(require("./models/builds"), exports);
__exportStar(require("./models/guilds"), exports);
__exportStar(require("./models/keys"), exports);
__exportStar(require("./models/specializations"), exports);
__exportStar(require("./models/titles"), exports);
__exportStar(require("./models/winners"), exports);
__exportStar(require("./models/worlds"), exports);
