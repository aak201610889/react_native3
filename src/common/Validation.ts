// utils/passwordUtils.js

export const isPasswordValid = (password:string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};


export const isEmailValid = (email:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const isArabicInputValid = (input:string) => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(input);
};


export const isEnglishInputValid = (input:any) => {
  const englishRegex = /^[a-zA-Z\s]+$/;
  return englishRegex.test(input);
};


export const isNumberInputValid = (input:any) => {
  const numberRegex = /^\d+$/;
  return numberRegex.test(input);
};




export const doPasswordsMatch = (password:string, confirmPassword:string) => {
  return password === confirmPassword;
};
