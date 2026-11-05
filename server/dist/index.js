"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const apiRoutes_1 = require("./routes/apiRoutes");
const app = (0, express_1.default)();
// Security & Parsing Middleware
app.use((0, helmet_1.default)({ contentSecurityPolicy: false })); // allow swagger cdn
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'HEALTHY',
        service: 'MoneyVerseAI.com Backend',
        timestamp: new Date().toISOString(),
    });
});
// API Routes
app.use('/api', apiRoutes_1.apiRouter);
// Serve Static Frontend Assets (Production Full-Stack Unified Mode)
const possibleDistPaths = [
    path_1.default.resolve(__dirname, '../../client/dist'),
    path_1.default.resolve(__dirname, '../client/dist'),
    path_1.default.resolve(process.cwd(), 'client/dist'),
    path_1.default.resolve(process.cwd(), 'dist'),
];
const clientDistPath = possibleDistPaths.find((p) => fs_1.default.existsSync(p));
if (clientDistPath) {
    app.use(express_1.default.static(clientDistPath));
    console.log(`[Frontend] Serving static client build from: ${clientDistPath}`);
    // React Router SPA Catch-all
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
            return next();
        }
        res.sendFile(path_1.default.join(clientDistPath, 'index.html'));
    });
}
// Start Server
async function startServer() {
    await (0, db_1.connectDB)();
    app.listen(env_1.ENV.PORT, () => {
        console.log(`[MoneyVerse Server] Running on http://localhost:${env_1.ENV.PORT}`);
        console.log(`[OpenAPI Docs] Available at http://localhost:${env_1.ENV.PORT}/api/docs`);
    });
}
startServer();
