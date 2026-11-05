# MoneyVerseAI.com 🚀
### Dark, Premium Investment Platform for Indian Investors (Bonds, Money Market, Unlisted Shares)

MoneyVerseAI is an institutional-grade, dark-themed fintech platform crafted with pixel-level precision matching the reference design screenshots:
1. **Home / Landing Page** (`/`): Glowing 3D globe with ascending gold bar-chart illustration, 3 asset class cards, stats strip, functional AI Assistant robot module, top picks, dusk city skyline CTA banner, and sticky glass navigation.
2. **Investor Dashboard** (`/dashboard`): Welcome header with portfolio value (₹ 12,48,750), 4 stat cards, Recharts donut portfolio breakdown, returns area chart with 6M toggle, Current Holdings table, Maturity Tracking timeline with days-remaining badges, Transaction History, Quick Actions, and document downloads.
3. **Compliance Center** (`/compliance/risk-disclosure` + 4 other pages):
   - `/compliance/risk-disclosure`: Maroon danger warning banner, 5 risk cards with colored icon circles, Important Notes checklist, and "Your Financial Well-being Matters" card.
   - `/compliance/kyc-aml`: 8 structured accordions with PMLA / SEBI CKYC details.
   - `/compliance/privacy-policy`: 8 accordions adhering to the Digital Personal Data Protection (DPDP) Act 2023.
   - `/compliance/terms`: 9 detailed legal accordions.
   - `/compliance/regulatory-disclaimers`: 4 accordions covering SEBI, RBI, MCA, and OBPP frameworks.
4. **Interactive Design System** (`/design-system`): Complete interactive showcase of all components (Buttons, Inputs, Selects, OTP, Badges, Stat Cards, Data Tables, Modals, Drawers, Skeletons, Timelines).
5. **Full Investment & Checkout Flow** (`/investments`, `/investments/:id`): 4-step modal investment flow with confetti celebration.
6. **AI Assistant** (`/ai-assistant`): Real-time financial insights on yields, taxation (LTCG / TDS), and pre-IPO lock-in periods.
7. **Backend API & Swagger Docs** (`/api/docs`): Express + TypeScript REST API with JWT authentication, PDF generation (pdfkit), and seed data.

---

## 🛠 Tech Stack

### Frontend
- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** with custom fintech design system (`#040A16`, `#0A1224`, `#F5B82E`, `#2F80ED`)
- **Framer Motion** for smooth spring transitions and micro-interactions
- **Recharts** for interactive donut & returns performance area charts
- **Lucide React** for consistent fintech iconography
- **Zustand** for state management (pre-loaded with Rohit Sharma MV10023 demo investor)
- **canvas-confetti** for investment completion celebrations

### Backend
- **Node.js** + **Express** + **TypeScript**
- **JWT** authentication + bcryptjs password encryption
- **Helmet**, **CORS**, **Morgan**
- **PDFKit** for automated PDF portfolio statement generation
- **Swagger/OpenAPI** interactive documentation at `/api/docs`
- Resilient hybrid storage: seamless MongoDB integration with automatic in-memory fallback.

---

## ⚡ Quick Start Guide

### 1. Run the Frontend (React + Vite)
```bash
cd client
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser!

### 2. Run the Backend API (Express + TypeScript)
```bash
cd server
npm run dev
```
Open **[http://localhost:5000/api/docs](http://localhost:5000/api/docs)** to inspect the OpenAPI docs!

---

## 🗺 Primary Routes & Pages

| Route | Description |
|---|---|
| `/` | **Home Page** (Pixel-match of Image 4) |
| `/dashboard` | **Investor Dashboard** (Pixel-match of Image 2) |
| `/compliance/risk-disclosure` | **Risk Disclosure** (Pixel-match of Image 1) |
| `/compliance/kyc-aml` | **KYC & AML Norms** (8 accordions, Image 3) |
| `/compliance/privacy-policy` | **Privacy Policy** (DPDP Act 2023 compliant) |
| `/compliance/terms` | **Terms of Use** (9 accordions, Image 3) |
| `/compliance/regulatory-disclaimers` | **Regulatory Disclaimers** (SEBI / RBI framework) |
| `/design-system` | **Fintech Design System Showroom** |
| `/investments` | **Investments Directory & Filters** |
| `/investments/inv-hdfc-ncd` | **Investment Details & 4-Step Checkout** |
| `/portfolio` | **Portfolio Holdings Ledger** |
| `/transactions` | **Audit Transaction Ledger** |
| `/documents` | **Statements & KYC Stepper** |
| `/ai-assistant` | **MoneyVerse AI Conversational Assistant** |
| `/auth/login` | **Investor Login** (With Rohit Sharma Auto-Fill) |
| `/auth/register` | **Investor Registration & 6-Digit OTP Verification** |
