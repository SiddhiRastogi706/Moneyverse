import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Select,
  OTPInput,
  Badge,
  Card,
  StatCard,
  ChartCard,
  Tabs,
  Accordion,
  DataTable,
  Modal,
  Drawer,
  Tooltip,
  Breadcrumb,
  Stepper,
  Timeline,
  Skeleton,
  EmptyState,
  SectionHeader,
  Logo,
} from '../components/common';
import {
  TrendingUp,
  ShieldCheck,
  Search,
  Download,
  AlertTriangle,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [otpValue, setOtpValue] = useState('1234');
  const [activeStep, setActiveStep] = useState(1);

  const sampleTableCols = [
    { key: 'name', header: 'Investment', sortable: true },
    { key: 'category', header: 'Category' },
    { key: 'yield', header: 'Expected Yield', align: 'right' as const, sortable: true },
    { key: 'rating', header: 'Rating', align: 'center' as const },
  ];

  const sampleTableData = [
    { id: '1', name: 'HDFC Bank NCD', category: 'Bonds', yield: '9.25% p.a.', rating: 'AAA' },
    { id: '2', name: 'HDFC Balanced Advantage Fund', category: 'Mutual Funds', yield: '14.85% CAGR', rating: '5 Star' },
    { id: '3', name: 'Reliance Industries (Unlisted)', category: 'Unlisted Shares', yield: '14.60% Return', rating: 'Pre-IPO' },
  ];

  return (
    <div className="min-h-screen bg-base py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-border-subtle pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold mb-2 block">
            MONEYVERSE AI DESIGN SYSTEM
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Component Library & Design Tokens
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Pixel-perfect specifications matching the dark fintech theme of MoneyVerse.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <Button variant="gold" onClick={() => setModalOpen(true)}>
            Open Test Modal
          </Button>
        </div>
      </div>

      {/* Brand & Logos */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2">
          1. Brand Identity & Logos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col items-center justify-center gap-3">
            <span className="text-xs text-text-muted">Landing Page Wordmark</span>
            <Logo subtitle="bonds" />
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center gap-3">
            <span className="text-xs text-text-muted">Wealth Tagline Wordmark</span>
            <Logo subtitle="invest" />
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center gap-3">
            <span className="text-xs text-text-muted">Compact Icon Mark</span>
            <Logo variant="compact" />
          </Card>
        </div>
      </section>

      {/* Color Tokens */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2">
          2. Color Tokens & Asset Themes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-base border border-border-subtle text-xs">
            <div className="w-full h-10 rounded bg-[#040A16] mb-2 border border-white/10" />
            <p className="font-bold text-white">bg-base</p>
            <p className="text-text-muted text-[11px]">#040A16</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle text-xs">
            <div className="w-full h-10 rounded bg-[#0A1224] mb-2 border border-white/10" />
            <p className="font-bold text-white">surface-1</p>
            <p className="text-text-muted text-[11px]">#0A1224</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle text-xs">
            <div className="w-full h-10 rounded bg-[#0E1A33] mb-2" />
            <p className="font-bold text-white">surface-2</p>
            <p className="text-text-muted text-[11px]">#0E1A33</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle text-xs">
            <div className="w-full h-10 rounded bg-[#F5B82E] mb-2 shadow-gold-glow" />
            <p className="font-bold text-white">primary-gold</p>
            <p className="text-text-muted text-[11px]">#F5B82E</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle text-xs">
            <div className="w-full h-10 rounded bg-[#2F80ED] mb-2 shadow-blue-glow" />
            <p className="font-bold text-white">accent-blue</p>
            <p className="text-text-muted text-[11px]">#2F80ED</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-1 border border-border-subtle text-xs">
            <div className="w-full h-10 rounded bg-gradient-to-r from-asset-bonds via-asset-moneyMarket to-asset-unlisted mb-2" />
            <p className="font-bold text-white">Asset Classes</p>
            <p className="text-text-muted text-[11px]">Bonds / MM / Pre-IPO</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2">
          3. Buttons & Interactive Controls
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="gold" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Investments
          </Button>
          <Button variant="secondary">Talk to an Expert</Button>
          <Button variant="outline-gold">View Opportunities</Button>
          <Button variant="danger">High Risk Warning</Button>
          <Button variant="gold" isLoading>
            Processing...
          </Button>
          <IconButton label="Search" variant="secondary">
            <Search className="w-4 h-4" />
          </IconButton>
          <IconButton label="Shield" variant="gold">
            <ShieldCheck className="w-4 h-4" />
          </IconButton>
        </div>
      </section>

      {/* Badges & Pills */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2">
          4. Asset Class & Status Badges
        </h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="bonds" dot>
            Bonds
          </Badge>
          <Badge variant="mutualFunds" dot>
            Mutual Funds
          </Badge>
          <Badge variant="unlisted" dot>
            Unlisted Shares
          </Badge>
          <Badge variant="cash" dot>
            Cash / Others
          </Badge>
          <Badge variant="gold">30 Days Left</Badge>
          <Badge variant="success">Completed</Badge>
          <Badge variant="warning">Under Review</Badge>
          <Badge variant="danger">High Risk</Badge>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2">
          5. Inputs, Selects & OTP Input
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Full Name as per PAN"
            placeholder="Rohit Sharma"
            defaultValue="Rohit Sharma"
          />
          <Select
            label="Select Asset Class"
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'bonds', label: 'Bonds (9.25% Avg)' },
              { value: 'mf', label: 'Mutual Funds (14.2% Avg)' },
              { value: 'unlisted', label: 'Unlisted Shares' },
            ]}
          />
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary">
              6-Digit Secure OTP
            </label>
            <OTPInput value={otpValue} onChange={setOtpValue} />
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2">
          6. Stat Cards (Dashboard Style)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Investment"
            value="₹ 10,50,000"
            subValue="Principal Amount"
            icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
            iconBgColor="bg-emerald-500/15"
          />
          <StatCard
            title="Total Returns"
            value="₹ 1,36,240"
            trend={{ value: '12.97% (Overall)', isPositive: true }}
            icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
            iconBgColor="bg-blue-500/15"
          />
          <StatCard
            title="Active Investments"
            value="5"
            subValue="Across 3 Asset Classes"
            icon={<ShieldCheck className="w-5 h-5 text-purple-400" />}
            iconBgColor="bg-purple-500/15"
          />
          <StatCard
            title="Upcoming Maturities"
            value="2"
            subValue="Next 6 Months"
            icon={<Sparkles className="w-5 h-5 text-gold" />}
            iconBgColor="bg-gold/15"
          />
        </div>
      </section>

      {/* Data Table */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2">
          7. Sortable Data Table
        </h2>
        <DataTable
          columns={sampleTableCols}
          data={sampleTableData}
          keyExtractor={(row) => row.id}
        />
      </section>

      {/* Accordion & Timeline */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2 mb-6">
            8. Accordion (Compliance Format)
          </h2>
          <Accordion
            items={[
              {
                id: 'acc1',
                number: 1,
                title: 'Market Risk & Volatility',
                subtitle: 'Fluctuations based on economic indicators',
                content:
                  'The value of fixed income and unlisted shares may fluctuate based on interest rate cycles, inflation trends, and macro-economic factors.',
                defaultOpen: true,
              },
              {
                id: 'acc2',
                number: 2,
                title: 'Credit & Default Risk',
                subtitle: 'Assessing the creditworthiness of corporate issuers',
                content:
                  'While corporate bonds feature ratings up to AAA, every corporate instrument carries an inherent degree of credit risk.',
              },
            ]}
          />
        </div>

        <div>
          <h2 className="text-xl font-bold font-heading text-white border-b border-border-subtle/50 pb-2 mb-6">
            9. Maturity Timeline
          </h2>
          <Card className="p-5">
            <Timeline
              events={[
                {
                  id: '1',
                  title: 'HDFC Bank NCD',
                  dateOrInfo: '₹ 2,00,000 · 15 Jun 2026',
                  badge: <Badge variant="success">30 Days Left</Badge>,
                },
                {
                  id: '2',
                  title: 'Tata Motors Unlisted Shares',
                  dateOrInfo: '₹ 75,000 · 22 Aug 2026',
                  badge: <Badge variant="bonds">118 Days Left</Badge>,
                },
              ]}
            />
          </Card>
        </div>
      </section>

      {/* Test Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Test Modal Dialog">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            This modal supports full keyboard trapping, escape handling, backdrop blur, and
            smooth spring transitions.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gold" size="sm" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Test Drawer */}
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Navigation Drawer">
        <div className="p-4 space-y-4">
          <p className="text-sm text-text-secondary">
            Responsive navigation drawer for mobile and tablet screens.
          </p>
          <Button variant="gold" size="sm" className="w-full" onClick={() => setDrawerOpen(false)}>
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </div>
  );
};
