import { Router } from 'express';
import { register, login, logout, verifyOtp } from '../controllers/authController';
import {
  getSummary,
  getHoldings,
  getMaturities,
  getPerformance,
} from '../controllers/portfolioController';
import {
  getInvestments,
  getInvestmentById,
  getTransactions,
  createTransaction,
  getDocuments,
  downloadDocument,
  chatWithAI,
} from '../controllers/apiControllers';
import { SEED_USER } from '../seeds/seedData';

export const apiRouter = Router();

// Auth Routes
apiRouter.post('/auth/register', register);
apiRouter.post('/auth/login', login);
apiRouter.post('/auth/logout', logout);
apiRouter.post('/auth/verify-otp', verifyOtp);

// User Profile
apiRouter.get('/users/me', (req, res) => res.json({ success: true, user: SEED_USER }));

// Portfolio Routes
apiRouter.get('/portfolio/summary', getSummary);
apiRouter.get('/portfolio/holdings', getHoldings);
apiRouter.get('/portfolio/maturities', getMaturities);
apiRouter.get('/portfolio/performance', getPerformance);

// Investments
apiRouter.get('/investments', getInvestments);
apiRouter.get('/investments/:id', getInvestmentById);

// Transactions
apiRouter.get('/transactions', getTransactions);
apiRouter.post('/transactions', createTransaction);

// Documents
apiRouter.get('/documents', getDocuments);
apiRouter.get('/documents/:id/download', downloadDocument);

// AI Assistant
apiRouter.post('/ai/chat', chatWithAI);

// OpenAPI / Swagger Docs Endpoint
apiRouter.get('/docs', (req, res) => {
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
