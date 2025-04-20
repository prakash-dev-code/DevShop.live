import { apiMethod } from "@/utils/apiMethod";

const signIN = async (body: any) => {
  return apiMethod(`api/v1/users/sign-in/`, "post", body);
};

const forgerPassword = async (body: any) => {
  return apiMethod(`api/v1/users/forget-password/`, "post", body);
};

const resetPassword = async (body:any,token: any) => {
  return apiMethod(`api/v1/users/reset-password/${token}`, "post", body);
};

export const useApi = () => ({
  signIN,
  forgerPassword,
  resetPassword
});
