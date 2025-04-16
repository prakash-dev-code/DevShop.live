import { apiMethod } from "@/utils/apiMethod";

const signIN = async (body: any) => {
  return apiMethod(`api/v1/users/sign-in/`, "post", body);
};

export const useApi = () => ({
  signIN,
});
