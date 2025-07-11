// Consistent formatting utilities to avoid hydration mismatches

export function formatCurrency(value: number): string {
  const absValue = Math.abs(value);
  
  if (absValue >= 1000000) {
    const millions = value / 1000000;
    const formatted = millions.toFixed(absValue >= 10000000 ? 0 : 1);
    // Remove trailing .0 for whole numbers
    return '$' + formatted.replace(/\.0$/, '') + 'M';
  } else if (absValue >= 1000) {
    const thousands = value / 1000;
    const formatted = thousands.toFixed(absValue >= 10000 ? 0 : 1);
    return '$' + formatted.replace(/\.0$/, '') + 'K';
  } else {
    return '$' + value.toFixed(0);
  }
}

export function formatNumber(value: number): string {
  const absValue = Math.abs(value);
  
  if (absValue >= 1000000) {
    const millions = value / 1000000;
    const formatted = millions.toFixed(absValue >= 10000000 ? 0 : 1);
    return formatted.replace(/\.0$/, '') + 'M';
  } else if (absValue >= 1000) {
    const thousands = value / 1000;
    const formatted = thousands.toFixed(absValue >= 10000 ? 0 : 1);
    return formatted.replace(/\.0$/, '') + 'K';
  } else {
    return value.toFixed(0);
  }
}

export function formatNumberWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return value.toFixed(decimals) + '%';
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}