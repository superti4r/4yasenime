export function formatDate(dateISO: string, locale: string = "id-ID") {
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return dateISO;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}
