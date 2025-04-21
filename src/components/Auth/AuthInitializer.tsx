"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "@/redux/features/auth-slice";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null; // No UI, just logic
};

export default AuthInitializer;
