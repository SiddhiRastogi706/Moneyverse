/**
 * Indian Fintech Formatters for MoneyVerse
 */

export function formatINR(value: number, options?: { showFraction?: boolean; compact?: boolean }): string {
  if (options?.compact) {
    if (Math.abs(value) >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (Math.abs(value) >= 100000) {
      return `₹ ${(value / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
    }
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: options?.showFraction ? 2 : 0,
    minimumFractionDigits: options?.showFraction ? 2 : 0,
  });

  return `₹ ${formatter.format(value)}`;
}

export function formatPercent(value: number, includeSign = false): string {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatDate(dateString: string | Date): string {
  const d = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export function formatDaysRemaining(targetDate: string | Date): number {
  const target = new Date(targetDate).getTime();
  const now = new Date('2026-05-16').getTime(); // Realistic anchor matching mockup
  const diffTime = target - now;
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
