const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/user/sendotp",
  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
};
