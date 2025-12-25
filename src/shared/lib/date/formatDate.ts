export function formatDate(iso: string, locale = 'de-DE'): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {return '';}

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
