import React, { useState } from 'react';
import { Send, Bot, Sparkles, AlertTriangle, Phone, Mail, Headphones, Clock } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/common/Card';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Namaste! I am MoneyVerse AI, your intelligent guide to Indian Fixed Income, Treasury Bills, and Pre-IPO markets. How can I assist your portfolio planning today?',
      timestamp: '10:00 AM',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('tax') || q.includes('tds')) {
        reply =
          'Interest income on Corporate Bonds is subject to TDS at 10% under Section 193 of the Income Tax Act if aggregate interest exceeds ₹5,000 in a financial year, and is taxed at your marginal slab rate. Listed bonds held for over 12 months qualify for Long Term Capital Gains (LTCG) tax at 12.5% without indexation (as per Finance Act 2024 revisions).';
      } else if (q.includes('unlisted') || q.includes('pre-ipo')) {
        reply =
          'Unlisted shares of top-tier growth firms like Groww, NSE, and Reliance Retail offer pre-listing alpha. However, please note unlisted equity carries a 6-month post-IPO promoter/pre-IPO lock-in under SEBI ICDR regulations, and transfers are conducted off-market via CDSL/NSDL DIS slips.';
      } else if (q.includes('t-bill') || q.includes('treasury')) {
        reply =
          'Treasury Bills (91, 182, 364 Days) are issued at a discount to face value and redeemed at par (₹100). The difference constitutes your yield (currently ~6.85% to 7.05%). They carry the sovereign guarantee of the Government of India and zero default risk.';
      } else {
        reply =
          'For balanced conservative growth, a 50:30:20 allocation across AAA Corporate Bonds (providing 9.25% fixed return), RBI T-Bills (ensuring high emergency liquidity), and select Pre-IPO leaders (for capital upside) is often utilized by seasoned Indian investors.';
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-sky-500 selection:text-white flex flex-col">
      <Navbar />

      <main className="max-w-[1080px] mx-auto px-4 sm:px-6 py-8 w-full flex-1 flex flex-col space-y-6">
        {/* Header */}
        <div className="text-center space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-600 block">
            OFFICIAL SUPPORT & AI ASSISTANCE
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight">
            Contact &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
              Customer Support
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Get direct assistance from our investment specialists or chat instantly with MoneyVerse AI.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* OFFICIAL CONTACT DESK (User Provided Phone & Email) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Support Card */}
          <div className="p-5 rounded-2xl bg-white border border-sky-200 shadow-sm flex items-center gap-4 hover:border-sky-400 transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Phone Support</p>
              <a
                href="tel:+918506931757"
                className="text-base sm:text-lg font-black text-slate-900 hover:text-sky-600 transition-colors block mt-0.5"
              >
                +91-8506931757
              </a>
              <p className="text-[11px] text-slate-500 mt-0.5">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
            </div>
          </div>

          {/* Email Support Card */}
          <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm flex items-center gap-4 hover:border-blue-400 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Email Helpdesk</p>
              <a
                href="mailto:salesmoneyverse@gmail.com"
                className="text-base sm:text-lg font-black text-slate-900 hover:text-sky-600 transition-colors block mt-0.5 truncate"
              >
                salesmoneyverse@gmail.com
              </a>
              <p className="text-[11px] text-slate-500 mt-0.5">Prompt response within 2 business hours</p>
            </div>
          </div>
        </div>

        {/* Global Warning Bar */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-50/80 border border-sky-200 text-xs text-slate-700 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>
            Disclaimer: Educational and informational assistance only. Not personalized financial or tax advice. Read offer documents carefully.
          </span>
        </div>

        {/* Chat History Container */}
        <Card className="flex-1 p-4 sm:p-6 min-h-[440px] flex flex-col justify-between space-y-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-lg text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-sky-500 text-white font-medium rounded-tr-none shadow-sky-500/25'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right mt-1.5 ${
                      msg.sender === 'user' ? 'text-white/80' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 shadow-sm">
                    RS
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-sky-600 p-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>MoneyVerse AI is synthesizing market data...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                'How is interest on corporate bonds taxed?',
                'What are the risks of investing in unlisted shares?',
                'Explain 91-day T-Bill yield mechanism',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="text-[11px] px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50 transition-all shadow-sm font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask about yields, liquidity, ratings, or taxation..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-sky-500 rounded-full py-3 pl-4 pr-12 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-100 transition-all shadow-sm"
              />
              <button
                onClick={() => handleSend()}
                className="absolute right-2 w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-sky-500/25"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
