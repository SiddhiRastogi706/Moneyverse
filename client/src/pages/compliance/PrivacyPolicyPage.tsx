import React from 'react';
import { ComplianceLayout } from '../../components/layout/ComplianceLayout';
import { Accordion } from '../../components/common/Accordion';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const privacyItems = [
    {
      id: 'priv-1',
      number: 1,
      title: 'Information We Collect',
      subtitle: 'Personal, financial and technical information such as name, contact details, KYC documents, transaction data and device information',
      defaultOpen: true,
      content: (
        <div className="space-y-2">
          <p>
            In order to provide debt market facilitating and investment portfolio tracking services, we collect:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li><strong className="text-slate-800">Identity & KYC Data:</strong> Name, PAN, Aadhaar (via DigiLocker/UIDAI compliant tokens), date of birth, gender, and photograph.</li>
            <li><strong className="text-slate-800">Contact Information:</strong> Verified email address, mobile number, and residential address.</li>
            <li><strong className="text-slate-800">Financial Data:</strong> Bank account number, IFSC code, demat account number (BOID/DP ID), and investor risk profile questionnaire.</li>
            <li><strong className="text-slate-800">Technical & Usage Data:</strong> IP address, device fingerprints, browser telemetry, and authentication event logs.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'priv-2',
      number: 2,
      title: 'Purpose of Collection',
      subtitle: 'To verify your identity, enable transactions, provide services, improve user experience and meet legal and regulatory obligations',
      content: (
        <p>
          Your data is processed strictly to execute investment orders, route settlement instructions to SEBI-registered clearing corporations (ICCL / NSE Clearing), provide portfolio analytics, prevent fraud, and comply with the Prevention of Money Laundering Act (PMLA).
        </p>
      ),
    },
    {
      id: 'priv-3',
      number: 3,
      title: 'Consent & Legal Basis',
      subtitle: 'We collect and process data with your consent or as required by applicable law and regulations',
      content: (
        <p>
          Under the Digital Personal Data Protection Act (DPDP Act), 2023, data processing is carried out pursuant to your explicit, informed consent and for "certain legitimate uses" which include compliance with statutory directives from regulatory bodies like SEBI and RBI.
        </p>
      ),
    },
    {
      id: 'priv-4',
      number: 4,
      title: 'Sharing of Information',
      subtitle: 'We may share your information with service providers, trusted partners and regulatory authorities where required by law',
      content: (
        <p>
          We never sell your data to third-party advertisers. Data is shared exclusively with SEBI-registered brokers, depositories (NSDL / CDSL), Registrar and Transfer Agents (RTAs like KFintech / CAMS), verified banking channels, and regulatory law enforcement authorities upon lawful requisition.
        </p>
      ),
    },
    {
      id: 'priv-5',
      number: 5,
      title: 'Security of Your Data',
      subtitle: 'We use industry-standard security measures to protect your information from unauthorized access, loss or misuse',
      content: (
        <p>
          All data in transit is encrypted using TLS 1.3 with forward secrecy. Sensitive personal data at rest is protected with AES-256 bit encryption within SOC-2 Type II and ISO 27001 certified AWS/GCP data centers situated physically within the Republic of India.
        </p>
      ),
    },
    {
      id: 'priv-6',
      number: 6,
      title: 'Data Retention',
      subtitle: 'We retain your data only for as long as necessary to fulfill the purposes described or as required by law',
      content: (
        <p>
          In accordance with SEBI guidelines and PMLA statutory retention rules, customer KYC records, audit trails, and transaction histories are retained for a minimum mandatory statutory duration of 5 years following account closure.
        </p>
      ),
    },
    {
      id: 'priv-7',
      number: 7,
      title: 'Your Rights',
      subtitle: 'You have the right to access, correct, update or request deletion of your personal data (as permitted by law)',
      content: (
        <p>
          You have the right to review the personal data stored on our platform, request corrections to erroneous entries, or request erasure of non-statutory data by contacting our dedicated Data Protection Officer.
        </p>
      ),
    },
    {
      id: 'priv-8',
      number: 8,
      title: 'Grievance & Contact',
      subtitle: 'For any privacy-related concerns, you can reach out to our support team through the contact details provided on the website',
      content: (
        <div className="space-y-2">
          <p>
            In compliance with the Information Technology Rules, 2021 and DPDP Act, 2023, the details of our Grievance Redressal Officer are:
          </p>
          <div className="p-3.5 bg-sky-50/80 border border-sky-200 rounded-xl text-xs space-y-1 text-slate-700">
            <p className="font-bold text-slate-900">Grievance & Support Desk: MoneyVerse Helpdesk</p>
            <p>
              Email:{' '}
              <a href="mailto:salesmoneyverse@gmail.com" className="text-sky-600 hover:underline font-semibold">
                salesmoneyverse@gmail.com
              </a>{' '}
              | Phone:{' '}
              <a href="tel:+918506931757" className="text-sky-600 hover:underline font-semibold">
                +91-8506931757
              </a>
            </p>
            <p>Address: Level 14, Platina Tower, Bandra-Kurla Complex (BKC), Mumbai - 400051</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <ComplianceLayout
      title={
        <>
          Privacy{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
            Policy
          </span>
        </>
      }
      subtitle="Your data. Our responsibility. We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, store and protect your data."
      breadcrumbLabel="Privacy Policy"
      heroIcon="lock"
    >
      <div className="space-y-6">
        <Accordion items={privacyItems} allowMultiple />
      </div>
    </ComplianceLayout>
  );
};
