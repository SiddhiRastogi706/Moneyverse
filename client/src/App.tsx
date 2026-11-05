import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { DashboardPage } from './pages/DashboardPage';
import { RiskDisclosurePage } from './pages/compliance/RiskDisclosurePage';
import { KycAmlPage } from './pages/compliance/KycAmlPage';
import { PrivacyPolicyPage } from './pages/compliance/PrivacyPolicyPage';
import { TermsPage } from './pages/compliance/TermsPage';
import { RegulatoryDisclaimersPage } from './pages/compliance/RegulatoryDisclaimersPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { InvestmentsPage } from './pages/investments/InvestmentsPage';
import { InvestmentDetailPage } from './pages/investments/InvestmentDetailPage';
import { DrhpFiledPage } from './pages/investments/DrhpFiledPage';
import { PortfolioPage } from './pages/portfolio/PortfolioPage';
import { TransactionsPage } from './pages/transactions/TransactionsPage';
import { DocumentsPage } from './pages/documents/DocumentsPage';
import { AIAssistantPage } from './pages/ai/AIAssistantPage';
import { AdminPage } from './pages/admin/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LeadCapturePopup } from './components/common/LeadCapturePopup';
import { AuthModal } from './components/common/AuthModal';
import { GoogleAuthPopup } from './components/common/GoogleAuthPopup';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Compliance Center (5 Pages) */}
        <Route path="/compliance/risk-disclosure" element={<RiskDisclosurePage />} />
        <Route path="/compliance/kyc-aml" element={<KycAmlPage />} />
        <Route path="/compliance/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/compliance/terms" element={<TermsPage />} />
        <Route path="/compliance/regulatory-disclaimers" element={<RegulatoryDisclaimersPage />} />
        <Route path="/compliance" element={<Navigate to="/compliance/risk-disclosure" replace />} />

        {/* Authentication */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Investments, DRHP Pipeline & Flows */}
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/investments/:id" element={<InvestmentDetailPage />} />
        <Route path="/drhp-filed" element={<DrhpFiledPage />} />

        {/* Portfolio, Transactions, KYC, Documents & Reports */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/kyc-verification" element={<DocumentsPage />} />
        <Route path="/reports" element={<DocumentsPage />} />

        {/* AI Assistant */}
        <Route path="/ai-assistant" element={<AIAssistantPage />} />

        {/* Admin Control Center */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Resources & Info redirects */}
        <Route path="/insights" element={<Navigate to="/drhp-filed" replace />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/contact" element={<AIAssistantPage />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Auto-Lead Capture Popup (Triggers after 5 seconds) */}
      <LeadCapturePopup />

      {/* Global Authentication Modal (Continue with Google, Name, Username/Email, Password, Confirm Password) */}
      <AuthModal />

      {/* Official Google Accounts Window Popup (Exact replication of Google OAuth Chrome window from Image 2) */}
      <GoogleAuthPopup />
    </>
  );
};

export default App;
