const toIsoDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const expandDateRange = (start, end = start) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start || '')) return [];
  const first = new Date(`${start}T00:00:00`);
  const last = /^\d{4}-\d{2}-\d{2}$/.test(end || '') ? new Date(`${end}T00:00:00`) : first;
  if (Number.isNaN(first.getTime()) || Number.isNaN(last.getTime()) || last < first) return [];
  const dates = [];
  const cursor = new Date(first);
  while (cursor <= last && dates.length < 370) {
    dates.push(toIsoDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
};

export const parseEventDateLabel = (label = '') => {
  const text = String(label).trim().replace(/–|—/g, '-');
  if (!text) return [];

  const range = text.match(/^([A-Za-z]+)\s+(\d{1,2})\s*-\s*(\d{1,2}),?\s+(\d{4})$/);
  if (range) {
    const [, month, startDay, endDay, year] = range;
    const start = new Date(`${month} ${startDay}, ${year}`);
    const end = new Date(`${month} ${endDay}, ${year}`);
    return Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) ? [] : expandDateRange(toIsoDate(start), toIsoDate(end));
  }

  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? [] : [toIsoDate(parsed)];
};

export const collectBlockedDates = (data = {}, localDates = []) => {
  const dates = new Set(Array.isArray(localDates) ? localDates.filter(Boolean) : []);
  (Array.isArray(data?.reservationDates) ? data.reservationDates : []).forEach((date) => date && dates.add(date));
  (Array.isArray(data?.eventRanges) ? data.eventRanges : []).forEach((event) => {
    const expanded = event?.start
      ? expandDateRange(event.start, event.end || event.start)
      : parseEventDateLabel(event?.label);
    expanded.forEach((date) => dates.add(date));
  });
  return Array.from(dates).sort();
};
