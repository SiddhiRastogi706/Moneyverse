"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePortfolioStatementPDF = generatePortfolioStatementPDF;
const pdfkit_1 = __importDefault(require("pdfkit"));
function generatePortfolioStatementPDF(res, title, userName, investorId) {
    const doc = new pdfkit_1.default({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${title.toLowerCase().replace(/\s+/g, '-')}.pdf"`);
    doc.pipe(res);
    // Header
    doc.rect(0, 0, doc.page.width, 80).fill('#040A16');
    doc.fillColor('#F5B82E').fontSize(22).font('Helvetica-Bold').text('MoneyVerseAI.com', 40, 25);
    doc.fillColor('#A9B7D0').fontSize(9).font('Helvetica').text('INVEST · GROW · BUILD WEALTH', 40, 52);
    // Document Title & Metadata
    doc.moveDown(3);
    doc.fillColor('#040A16').fontSize(18).font('Helvetica-Bold').text(title, 40, 110);
    doc.fillColor('#6B7C9B').fontSize(10).font('Helvetica').text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 40, 132);
    // Investor Information Box
    doc.rect(40, 155, doc.page.width - 80, 70).fillAndStroke('#F8FAFC', '#E2E8F0');
    doc.fillColor('#1E293B').fontSize(11).font('Helvetica-Bold').text('Investor Details', 55, 168);
    doc.fillColor('#475569').fontSize(10).font('Helvetica')
        .text(`Name: ${userName}`, 55, 188)
        .text(`Investor ID: ${investorId}`, 55, 204)
        .text('KYC Status: Verified (CKYC Compliant)', 320, 188)
        .text('Depository: CDSL (12081600 3982 1104)', 320, 204);
    // Portfolio Summary
    doc.moveDown(3);
    doc.fillColor('#040A16').fontSize(13).font('Helvetica-Bold').text('Portfolio Summary (As on 31 Mar 2026)', 40, 245);
    const tableTop = 270;
    doc.rect(40, tableTop, doc.page.width - 80, 24).fill('#0A1224');
    doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica-Bold')
        .text('Asset Class', 50, tableTop + 7)
        .text('Allocation', 220, tableTop + 7)
        .text('Current Value (INR)', 380, tableTop + 7, { align: 'right' });
    const rows = [
        { cat: 'Bonds & NCDs', alloc: '42.8%', val: '₹ 5,34,000' },
        { cat: 'Mutual Funds (Equity & Debt)', alloc: '28.3%', val: '₹ 3,53,000' },
        { cat: 'Unlisted Shares (Pre-IPO)', alloc: '18.7%', val: '₹ 2,34,500' },
        { cat: 'Cash & Liquid Escrow', alloc: '10.2%', val: '₹ 1,27,250' },
    ];
    let y = tableTop + 24;
    rows.forEach((r, idx) => {
        const bg = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
        doc.rect(40, y, doc.page.width - 80, 22).fill(bg);
        doc.fillColor('#1E293B').fontSize(9).font('Helvetica')
            .text(r.cat, 50, y + 6)
            .text(r.alloc, 220, y + 6)
            .text(r.val, 380, y + 6, { align: 'right' });
        y += 22;
    });
    // Total Row
    doc.rect(40, y, doc.page.width - 80, 24).fill('#E2E8F0');
    doc.fillColor('#0F172A').fontSize(10).font('Helvetica-Bold')
        .text('Total Portfolio Valuation', 50, y + 7)
        .text('100.0%', 220, y + 7)
        .text('₹ 12,48,750', 380, y + 7, { align: 'right' });
    // Regulatory Disclaimer Footer
    const footerY = doc.page.height - 70;
    doc.rect(0, footerY, doc.page.width, 70).fill('#040A16');
    doc.fillColor('#A9B7D0').fontSize(8).font('Helvetica')
        .text('Investments are subject to market risks. Read all scheme and offer documents carefully.', 40, footerY + 18, { align: 'center', width: doc.page.width - 80 })
        .text('MoneyVerseAI.com is an educational & facilitation technology platform. SEBI OBPP Regulated Routing.', 40, footerY + 34, { align: 'center', width: doc.page.width - 80 });
    doc.end();
}
