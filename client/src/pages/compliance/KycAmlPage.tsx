import React from 'react';
import { ComplianceLayout } from '../../components/layout/ComplianceLayout';
import { Accordion } from '../../components/common/Accordion';
import { Info, CheckCircle2 } from 'lucide-react';

export const KycAmlPage: React.FC = () => {
  const kycItems = [
    {
      id: 'kyc-1',
      number: 1,
      title: 'Identity Verification',
      subtitle: 'Verify your identity using valid government-issued documents',
      defaultOpen: true,
      content: (
        <div className="space-y-3">
          <p>
            Under the Prevention of Money Laundering Act (PMLA), 2002 and SEBI Master Circular on KYC norms, all investors must complete identity verification. Accepted documents include Aadhaar (via UIDAI offline XML or DigiLocker OTP), Passport, Voter ID Card, or Driving Licence.
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-text-muted">
            <li>Name on the identity document must match your bank account and PAN records exactly.</li>
            <li>In-person verification (IPV) via live video or Geo-tagged selfie is required for non-DigiLocker flows.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'kyc-2',
      number: 2,
      title: 'PAN Verification',
      subtitle: 'PAN is mandatory for investment in securities and related products',
      content: (
        <div className="space-y-2">
          <p>
            Permanent Account Number (PAN) issued by the Income Tax Department of India is verified instantaneously via the Income Tax / NSDL / UTIITSL verification API.
          </p>
          <p>
            Ensure your PAN is linked with your Aadhaar in compliance with Section 139AA of the Income Tax Act, 1961 to prevent operative invalidation.
          </p>
        </div>
      ),
    },
    {
      id: 'kyc-3',
      number: 3,
      title: 'Address Proof',
      subtitle: 'Provide a valid address proof such as Aadhaar, passport, utility bill or bank statement',
      content: (
        <p>
          The address registered with CKYC (Central KYC Registry) or DigiLocker is used as primary residence proof. If your current communication address differs from your permanent address, an electricity bill, piped gas bill, or bank account statement (not older than 3 months) must be submitted.
        </p>
      ),
    },
    {
      id: 'kyc-4',
      number: 4,
      title: 'Bank Account Details',
      subtitle: 'Link a bank account in your name for seamless transactions',
      content: (
        <p>
          All investment subscriptions, coupon payouts, dividend credits, and redemption proceeds must flow through a verified Indian savings or current bank account (NRE/NRO for permitted NRI transactions). We verify account ownership using a penny-drop IMPS validation.
        </p>
      ),
    },
    {
      id: 'kyc-5',
      number: 5,
      title: 'Beneficial Owner Information',
      subtitle: 'In case of entities or joint accounts, provide details of beneficial owners where applicable',
      content: (
        <p>
          For non-individual accounts (HUFs, Corporates, LLPs, Family Trusts), natural persons exercising ultimate effective control or holding 10% or more ownership interest must be identified and verified in compliance with RBI/SEBI beneficial ownership guidelines.
        </p>
      ),
    },
    {
      id: 'kyc-6',
      number: 6,
      title: 'AML / CFT Screening',
      subtitle: 'Your profile will be screened against global and domestic AML/CFT databases and watchlists',
      content: (
        <p>
          MoneyVerseAI runs automated screening against OFAC, FATF non-compliant jurisdictions, UN Security Council Sanctions lists, and the Indian Ministry of Home Affairs UAPA list to counter terrorist financing and money laundering.
        </p>
      ),
    },
    {
      id: 'kyc-7',
      number: 7,
      title: 'Document Security',
      subtitle: 'Your documents are securely stored and used only for verification and compliance purposes',
      content: (
        <p>
          All uploaded KYC documents, government IDs, and verification records are encrypted at rest with AES-256 and transmitted with TLS 1.3 cryptographic protection in accordance with CERT-In standards and the Digital Personal Data Protection (DPDP) Act 2023.
        </p>
      ),
    },
    {
      id: 'kyc-8',
      number: 8,
      title: 'Periodic Re-KYC',
      subtitle: 'We may request updated information from time to time as per regulatory requirements',
      content: (
        <p>
          SEBI and RBI guidelines mandate periodic updation of KYC records based on investor risk classification (low risk: every 10 years, medium risk: every 8 years, high risk: every 2 years). You will be notified via email and SMS before any pending re-KYC deadline.
        </p>
      ),
    },
  ];

  return (
    <ComplianceLayout
      title={
        <>
          KYC &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
            AML
          </span>
        </>
      }
      subtitle="Secure. Compliant. Trusted. We follow robust Know Your Customer (KYC) and Anti-Money Laundering (AML) procedures to ensure a safe and compliant investing experience."
      breadcrumbLabel="KYC & AML"
      heroIcon="id"
    >
      <div className="space-y-6">
        <Accordion items={kycItems} allowMultiple />

        {/* Bottom Info Banner (Clean Light Bluish Card) */}
        <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50/60 border border-sky-200 text-xs sm:text-sm text-slate-700 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Info className="w-5 h-5" />
          </div>
          <p className="leading-relaxed">
            KYC requirements and the process may vary depending on the regulated intermediary, exchange, and applicable laws and regulations of the Reserve Bank of India and Securities and Exchange Board of India.
          </p>
        </div>
      </div>
    </ComplianceLayout>
  );
};
