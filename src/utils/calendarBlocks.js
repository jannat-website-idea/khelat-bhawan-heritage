const MONTH_MAP = {
  january: 0, jan: 0,
  february: 1, feb: 1,
  march: 2, mar: 2,
  april: 3, apr: 3,
  may: 4,
  june: 5, jun: 5,
  july: 6, jul: 6,
  august: 7, aug: 7,
  september: 8, sep: 8, sept: 8,
  october: 9, oct: 9,
  november: 10, nov: 10,
  december: 11, dec: 11,
};

const toIsoDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const expandDateRange = (start, end = start) => {
  if (!start) return [];
  const startStr = String(start).trim();
  const endStr = String(end || start).trim();

  // Handle standard ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(startStr)) {
    const first = new Date(`${startStr}T00:00:00`);
    const last = /^\d{4}-\d{2}-\d{2}$/.test(endStr) ? new Date(`${endStr}T00:00:00`) : first;
    if (Number.isNaN(first.getTime()) || Number.isNaN(last.getTime()) || last < first) return [startStr];
    const dates = [];
    const cursor = new Date(first);
    while (cursor <= last && dates.length < 370) {
      dates.push(toIsoDate(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  }

  // Fallback to parsing textual dates if start is not ISO
  return parseEventDateLabel(`${startStr} - ${endStr}`);
};

export const parseEventDateLabel = (label = '') => {
  const text = String(label).trim().replace(/[–—]/g, '-').replace(/,/g, ' ');
  if (!text) return [];

  // Match ISO YYYY-MM-DD
  const isoSingle = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoSingle) return [text];

  // Match: 'Month D - D YYYY' (e.g. 'October 18 - 22 2026')
  const mMonthFirst = text.match(/^([A-Za-z]+)\s+(\d{1,2})\s*-\s*(\d{1,2})\s+(\d{4})$/);
  if (mMonthFirst) {
    const m = MONTH_MAP[mMonthFirst[1].toLowerCase()];
    if (m !== undefined) {
      const year = Number(mMonthFirst[4]);
      const start = new Date(year, m, Number(mMonthFirst[2]));
      const end = new Date(year, m, Number(mMonthFirst[3]));
      return expandDateRange(toIsoDate(start), toIsoDate(end));
    }
  }

  // Match: 'D - D Month YYYY' (e.g. '18 - 22 October 2026')
  const mDayFirst = text.match(/^(\d{1,2})\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (mDayFirst) {
    const m = MONTH_MAP[mDayFirst[3].toLowerCase()];
    if (m !== undefined) {
      const year = Number(mDayFirst[4]);
      const start = new Date(year, m, Number(mDayFirst[1]));
      const end = new Date(year, m, Number(mDayFirst[2]));
      return expandDateRange(toIsoDate(start), toIsoDate(end));
    }
  }

  // Match: 'D Month YYYY' (e.g. '14 October 2026')
  const mSingleDay = text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (mSingleDay) {
    const m = MONTH_MAP[mSingleDay[2].toLowerCase()];
    if (m !== undefined) {
      return [toIsoDate(new Date(Number(mSingleDay[3]), m, Number(mSingleDay[1])))];
    }
  }

  // Match: 'Month D YYYY' (e.g. 'October 14 2026')
  const mSingleMonth = text.match(/^([A-Za-z]+)\s+(\d{1,2})\s+(\d{4})$/);
  if (mSingleMonth) {
    const m = MONTH_MAP[mSingleMonth[1].toLowerCase()];
    if (m !== undefined) {
      return [toIsoDate(new Date(Number(mSingleMonth[3]), m, Number(mSingleMonth[2])))];
    }
  }

  // Native Date parsing fallback
  const parsed = new Date(label);
  return Number.isNaN(parsed.getTime()) ? [] : [toIsoDate(parsed)];
};

export const collectBlockedDates = (data = {}, localDates = []) => {
  const dates = new Set(Array.isArray(localDates) ? localDates.filter(Boolean) : []);
  (Array.isArray(data?.reservationDates) ? data.reservationDates : []).forEach((date) => date && dates.add(date));
  (Array.isArray(data?.eventRanges) ? data.eventRanges : []).forEach((event) => {
    let expanded = [];
    if (event?.start) {
      expanded = expandDateRange(event.start, event.end || event.start);
    }
    if (!expanded.length && event?.label) {
      expanded = parseEventDateLabel(event.label);
    }
    expanded.forEach((date) => dates.add(date));
  });
  return Array.from(dates).sort();
};
