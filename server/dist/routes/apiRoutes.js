"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const portfolioController_1 = require("../controllers/portfolioController");
const apiControllers_1 = require("../controllers/apiControllers");
const seedData_1 = require("../seeds/seedData");
exports.apiRouter = (0, express_1.Router)();
// Auth Routes
exports.apiRouter.post('/auth/register', authController_1.register);
exports.apiRouter.post('/auth/login', authController_1.login);
exports.apiRouter.post('/auth/logout', authController_1.logout);
exports.apiRouter.post('/auth/verify-otp', authController_1.verifyOtp);
// User Profile
exports.apiRouter.get('/users/me', (req, res) => res.json({ success: true, user: seedData_1.SEED_USER }));
// Portfolio Routes
exports.apiRouter.get('/portfolio/summary', portfolioController_1.getSummary);
exports.apiRouter.get('/portfolio/holdings', portfolioController_1.getHoldings);
exports.apiRouter.get('/portfolio/maturities', portfolioController_1.getMaturities);
exports.apiRouter.get('/portfolio/performance', portfolioController_1.getPerformance);
// Investments
exports.apiRouter.get('/investments', apiControllers_1.getInvestments);
exports.apiRouter.get('/investments/:id', apiControllers_1.getInvestmentById);
// Transactions
exports.apiRouter.get('/transactions', apiControllers_1.getTransactions);
exports.apiRouter.post('/transactions', apiControllers_1.createTransaction);
// Documents
exports.apiRouter.get('/documents', apiControllers_1.getDocuments);
exports.apiRouter.get('/documents/:id/download', apiControllers_1.downloadDocument);
// AI Assistant
exports.apiRouter.post('/ai/chat', apiControllers_1.chatWithAI);
// OpenAPI / Swagger Docs Endpoint
exports.apiRouter.get('/docs', (req, res) => {
    const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>MoneyVerse AI - OpenAPI Documentation</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
      <style>body { background: #040A16; color: white; margin: 0; } .swagger-ui { filter: invert(88%) hue-rotate(180deg); }</style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
      <script>
        window.onload = () => {
          SwaggerUIBundle({
            dom_id: '#swagger-ui',
            spec: {
              openapi: "3.0.0",
              info: {
                title: "MoneyVerseAI.com Backend API",
                version: "1.0.0",
                description: "Institutional Indian Debt & Unlisted Securities API (SEBI/RBI Compliant)"
              },
              paths: {
                "/api/auth/login": { post: { summary: "Authenticate investor", responses: { 200: { description: "JWT Access Token" } } } },
                "/api/portfolio/summary": { get: { summary: "Fetch portfolio summary (₹ 12,48,750)", responses: { 200: { description: "Summary metrics" } } } },
                "/api/portfolio/holdings": { get: { summary: "Fetch active holdings", responses: { 200: { description: "Holdings array" } } } },
                "/api/investments": { get: { summary: "List investment products", responses: { 200: { description: "Investments array" } } } },
                "/api/transactions": { get: { summary: "List transaction history", responses: { 200: { description: "Transactions array" } } } },
                "/api/documents": { get: { summary: "List recent regulatory documents", responses: { 200: { description: "Documents list" } } } },
                "/api/ai/chat": { post: { summary: "Ask MoneyVerse AI Assistant", responses: { 200: { description: "Educational response" } } } }
              }
            }
          });
        };
      </script>
    </body>
  </html>
  `;
    res.send(html);
});
