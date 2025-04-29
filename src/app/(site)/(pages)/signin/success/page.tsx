"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/features/auth-slice";
import { useApi } from "@/services/apiServices";
import toast from "react-hot-toast";
import { User } from "@/types/common";

const SuccessPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { getLoggedUser } = useApi();
  useEffect(() => {
    const fetchUserData = async () => {
      const token = searchParams.get("token");

      dispatch(setLogin({ token, user: null })); // reset auth state

      if (!token) return;

      try {
        const res = await getLoggedUser();
        // console.log("User data from API:", res); // Debugging line

        const { data } = res as { data: { user: User } };
        if (data && data.user) {
          dispatch(setLogin({ token, user: data.user }));
          router.push("/");
          toast.success("Logged in successfully!");
        } else {
          throw new Error("User data not found");
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        dispatch(setLogin({ token, user: null }));
        router.push("/");
      }
    };

    fetchUserData();
  }, [dispatch, router, searchParams, getLoggedUser]);

  return <div>Login Successful! Redirecting...</div>;
};

export default SuccessPage;
