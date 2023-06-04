"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resultPostRoute_1 = __importDefault(require("./resultPostRoute"));
const scoreboardRoute_1 = __importDefault(require("./scoreboardRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
mongoose_1.default
    .connect(`mongodb+srv://giorgiocollova:${process.env.PASSWORD}@cluster0.v5rhlyd.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
app.use((0, cors_1.default)());
app.use(resultPostRoute_1.default);
app.use(scoreboardRoute_1.default);
app.listen(port, () => {
    // console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
