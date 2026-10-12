export const countWords = (value = '') => value.trim().split(/\s+/).filter(Boolean).length;
export const countCharacters = (value = '') => value.trim().length;

export const sanitizePhoneInput = (value = '') => {
  const raw = String(value);
  const hasLeadingPlus = raw.trimStart().startsWith('+');
  const maxDigits = hasLeadingPlus ? 12 : 11;
  const digits = raw.replace(/\D/g, '').slice(0, maxDigits);
  return `${hasLeadingPlus ? '+' : ''}${digits}`;
};

export const isValidPhone = (value = '') => {
  const raw = String(value).trim();
  let digits = raw.replace(/\D/g, '');
  if ((raw.startsWith('+91') || raw.startsWith('0091')) && digits.length === 12) digits = digits.slice(-10);
  return /^\d{10,11}$/.test(digits) && !/^(\d)\1+$/.test(digits);
};

export const isValidEmail = (value = '') => {
  const email = String(value).trim();
  return email.length <= 254 && !email.includes('..') && /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email);
};

export const phoneValidationMessage = 'Enter one valid mobile number containing 10–11 digits.';
export const emailValidationMessage = 'Enter a valid email address, such as name@gmail.com.';

export const validateGuestCount = (value = '') => {
  if (String(value).trim() === '') return 'Enter the estimated number of guests.';
  const guests = Number(value);
  if (!Number.isInteger(guests) || guests < 1 || guests > 150) {
    return 'Guest count must be a whole number between 1 and 150.';
  }
  return '';
};

export const validateEnquiry = ({phone, email, message}, options = {}) => {
  const errors = {};
  if (!isValidPhone(phone)) errors.phone = phoneValidationMessage;
  if (!isValidEmail(email)) errors.email = emailValidationMessage;
  if (options.validateGuests) {
    const guestError = validateGuestCount(options.guests);
    if (guestError) errors.guests = guestError;
  }
  if (options.minMessageCharacters) {
    if (countCharacters(message) < options.minMessageCharacters) {
      errors.message = `Please write at least ${options.minMessageCharacters} characters so our team can understand your enquiry.`;
    }
  } else {
    const minWords = options.minWords || 30;
    if (countWords(message) < minWords) {
      errors.message = `Please write at least ${minWords} words so our team can understand your enquiry.`;
    }
  }
  return errors;
};
