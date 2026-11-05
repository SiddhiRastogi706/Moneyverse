import React from 'react';
import { ComplianceLayout } from '../../components/layout/ComplianceLayout';
import { Accordion } from '../../components/common/Accordion';
import { Info } from 'lucide-react';

export const RegulatoryDisclaimersPage: React.FC = () => {
  const disclaimerItems = [
    {
      id: 'reg-1',
      number: 1,
      title: 'No SEBI / RBI Registration Claim',
      subtitle: 'MoneyVerse does not claim or imply any registration, authorisation or licence from SEBI, RBI or any other regulator unless it is actually registered or licensed to do so',
      defaultOpen: true,
      content: (
        <div className="space-y-2">
          <p>
            MoneyVerseAI Technology Services Private Limited operates strictly as a financial technology platform and digital facilitation infrastructure provider.
          </p>
          <p>
            Unless explicitly specified against a designated regulated activity (e.g. SEBI Research Analyst, SEBI Registered Investment Adviser, or SEBI Stock Broker / OBPP), we do not provide bespoke investment advice or manage client funds.
          </p>
        </div>
      ),
    },
    {
      id: 'reg-2',
      number: 2,
      title: 'Products and Applicable Regulators',
      subtitle: 'Investment products on the platform are subject to the regulator applicable to each product, including but not limited to: Listed Bonds (SEBI), Mutual Funds (SEBI), Unlisted Shares (MCA / Companies Act)',
      content: (
        <div className="space-y-3">
          <ul className="list-disc list-inside space-y-2 text-text-secondary">
            <li>
              <strong>Listed Bonds & Non-Convertible Debentures (NCDs):</strong> Regulated by the Securities and Exchange Board of India (SEBI) under SEBI (Issue and Listing of Non-Convertible Securities) Regulations, 2021.
            </li>
            <li>
              <strong>Mutual Funds:</strong> Regulated by the Securities and Exchange Board of India (SEBI) under SEBI (Mutual Funds) Regulations, 1996 and AMFI guidelines.
            </li>
            <li>
              <strong>Unlisted Shares:</strong> Subject to the Ministry of Corporate Affairs (MCA), Companies Act, 2013, and applicable private placement / transfer regulations. Unlisted shares do not enjoy exchange-traded guaranteed clearing.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'reg-3',
      number: 3,
      title: 'Online Bond Platform Provider (OBPP) Framework',
      subtitle: 'Online bond platform providers in India are subject to SEBI’s applicable framework for such platforms, as may be in force from time to time',
      content: (
        <p>
          All bond and debt securities offerings displayed on the platform are routed and settled exclusively through a SEBI-registered debt broker / Online Bond Platform Provider (OBPP) in full conformance with SEBI Circular SEBI/HO/DDHS/DDHS-RACPOD1/P/CIR/2022/154 dated November 14, 2022.
        </p>
      ),
    },
    {
      id: 'reg-4',
      number: 4,
      title: 'KYC Requirements',
      subtitle: 'KYC is completed in accordance with applicable securities market requirements and relevant laws and regulations',
      content: (
        <p>
          KYC compliance is verified in adherence to SEBI KYC Registration Agency (KRA) Regulations, 2011, and the Prevention of Money Laundering (Maintenance of Records) Rules, 2005. Customer records are cross-referenced with Central KYC Records Registry (CKYCR).
        </p>
      ),
    },
  ];

  return (
    <ComplianceLayout
      title={
        <>
          Regulatory{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
            Disclaimers
          </span>
        </>
      }
      subtitle="Important information about regulation and compliance. Please read the following regulatory information carefully. It is provided to help you understand the legal and regulatory framework applicable to the products and services on our platform."
      breadcrumbLabel="Regulatory Disclaimers"
      heroIcon="scale"
    >
      <div className="space-y-6">
        <Accordion items={disclaimerItems} allowMultiple />

        {/* Bottom Informational Note (Clean Light Bluish Card) */}
        <div className="flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50/60 border border-sky-200 text-xs sm:text-sm text-slate-700 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Info className="w-5 h-5" />
          </div>
          <p className="leading-relaxed">
            This website is for information and facilitation purposes only and does not constitute an offer, solicitation or recommendation to buy or sell any investment product. Investors are strongly advised to consult their independent SEBI-registered financial advisers.
          </p>
        </div>
      </div>
    </ComplianceLayout>
  );
};
