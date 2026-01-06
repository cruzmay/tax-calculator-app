export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

export function formatBracketRange(min: number, max?: number): string {
  if (max === undefined || max === null) {
    return `$${min.toLocaleString()}+`;
  }
  return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
}
