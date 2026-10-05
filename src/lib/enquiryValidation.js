export const countWords = (value = '') => value.trim().split(/\s+/).filter(Boolean).length;

export const isValidPhone = (value = '') => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
};

export const isValidEmail = (value = '') => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export const validateEnquiry = ({phone, email, message}) => {
  const errors = {};
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone number containing 10–11 digits.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address, such as name@gmail.com.';
  if (countWords(message) < 20) errors.message = 'Please write at least 20 words so our team can understand your enquiry.';
  return errors;
};
