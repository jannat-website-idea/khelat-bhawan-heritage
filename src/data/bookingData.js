// Booking and reservation calendar management
const INITIAL_BLOCKED_DATES = [
  '2026-10-18', '2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22', // Durga Puja 2026
  '2026-11-14', // Classical Sangeet Sabha
  '2026-12-06', // Heritage Walk
  '2026-12-25', '2026-12-31', '2027-01-01' // Year End Festivities
];

const STORAGE_KEY = 'khelat_bhawan_blocked_dates_v1';

export const getBlockedDates = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : INITIAL_BLOCKED_DATES;
    }
  } catch (e) {
    console.warn('LocalStorage unavailable for blocked dates:', e);
  }
  return INITIAL_BLOCKED_DATES;
};

export const saveBlockedDates = (datesArray) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datesArray));
  } catch (e) {
    console.error('Failed to save blocked dates:', e);
  }
};

export const isDateBlocked = (dateStr, blockedList = null) => {
  const list = blockedList || getBlockedDates();
  return list.includes(dateStr);
};

export const isPastDate = (dateObj) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateObj);
  target.setHours(0, 0, 0, 0);
  return target < today;
};
