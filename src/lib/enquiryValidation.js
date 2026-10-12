export const countWords = (value = '') => value.trim().split(/\s+/).filter(Boolean).length;
export const countCharacters = (value = '') => value.trim().length;

export const isValidPhone = (value = '') => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
};

export const isValidEmail = (value = '') => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};

export const validateEnquiry = ({phone, email, message}, options = {}) => {
  const errors = {};
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone number containing 10–11 digits.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address, such as name@gmail.com.';
  if (options.minMessageCharacters) {
    if (countCharacters(message) < options.minMessageCharacters) {
      errors.message = `Please write at least ${options.minMessageCharacters} characters so our team can understand your enquiry.`;
    }
  } else if (countWords(message) < 20) {
    errors.message = 'Please write at least 20 words so our team can understand your enquiry.';
  }
  return errors;
};
