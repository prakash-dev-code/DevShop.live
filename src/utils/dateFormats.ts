export function formatToMonthYear(isoDate: string): string {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatToDayMonthYear(isoDate: string): string {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
