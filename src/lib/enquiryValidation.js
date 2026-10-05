export const countWords = (value = '') => value.trim().split(/\s+/).filter(Boolean).length;

export const isValidPhone = (value = '') => {
  const raw = value.trim();
  let digits = raw.replace(/\D/g, '');
  if ((raw.startsWith('+91') || raw.startsWith('0091')) && digits.length === 12) digits = digits.slice(-10);
  return /^\d{10,11}$/.test(digits) && !/^(\d)\1+$/.test(digits);
};

export const isValidEmail = (value = '') => {
  const email = value.trim().toLowerCase();
  if (email.length > 254 || email.includes('..')) return false;
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(email);
};

export const validateEnquiry = ({phone, email, message}) => {
  const errors = {};
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone number containing 10–11 digits.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address, such as name@gmail.com.';
  if (countWords(message) < 20) errors.message = 'Please write at least 20 words so our team can understand your enquiry.';
  return errors;
};
