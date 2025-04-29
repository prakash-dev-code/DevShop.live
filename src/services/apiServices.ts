import { apiMethod } from "@/utils/apiMethod";

const signIN = async (body: any) => {
  return apiMethod(`api/v1/users/sign-in/`, "post", body);
};

const forgerPassword = async (body: any) => {
  return apiMethod(`api/v1/users/forget-password/`, "post", body);
};

const resetPassword = async (body: any, token: any) => {
  return apiMethod(`api/v1/users/reset-password/${token}`, "patch", body);
};

const signUp = async (body: any) => {
  return apiMethod(`api/v1/users/sign-up/`, "post", body);
};
const verifyOTP = async (body: any) => {
  return apiMethod(`api/v1/users/verify-email/`, "post", body);
};

const changePassword = async (body: any) => {
  return apiMethod(`api/v1/users/change-password/`, "patch", body, true);
};
const getLoggedUser = async () => {
  return apiMethod(`api/v1/users/me/`, "get", {}, true);
};
export const useApi = () => ({
  signIN,
  forgerPassword,
  resetPassword,
  signUp,
  verifyOTP,
  changePassword,
  getLoggedUser,
});
