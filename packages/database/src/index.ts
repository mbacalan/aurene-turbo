import { connect, connection } from "mongoose";
// import { logger } from "./";

connect(process.env.MONGO_URI || "mongodb://localhost:27017/local");

const db = connection;

db.on("error", () => console.error("Error connecting to database"));
db.once("open", () => console.info("Successfully connected to database"));

export { db };
export * from "./models/achievements";
export * from "./models/bosses";
export * from "./models/builds";
export * from "./models/guilds";
export * from "./models/keys";
export * from "./models/specializations";
export * from "./models/titles";
export * from "./models/winners";
export * from "./models/worlds";
