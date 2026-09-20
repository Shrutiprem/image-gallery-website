export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validateMobile = (mobile: string): boolean => {
  return /^[0-9]{10}$/.test(mobile);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};