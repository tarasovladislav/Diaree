"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_js_1 = __importDefault(require("./router.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
const db_js_1 = __importDefault(require("./models/db.js"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_js_1.default);
(0, db_js_1.default)().catch((error) => console.log(error));
async function startServer() {
    const server = app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
    return server;
}
if (require.main === module) {
    // If this file is run directly, start the server
    startServer();
}
exports.default = startServer;
