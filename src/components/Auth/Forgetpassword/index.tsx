"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useApi } from "@/services/apiServices";
import { signInSchema } from "@/shared/schemas/formSchema";
import { useFormik } from "formik";
import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { TbEyeClosed } from "react-icons/tb";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/features/auth-slice";
import { User } from "@/types/common";
import ButtonLoader from "@/components/Common/buttonLoader";
import { useRouter, useSearchParams } from "next/navigation";
type ForgotPasswordResponse = {
  status: "success" | "error"; // or just "success" if you expect only that
  message: string;
};
const Forgetpassword = ({ token }: { token: string }) => {
  const { signIN ,forgerPassword} = useApi();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const router = useRouter();
  // const { token } = router.query;
  console.log("Received token:", token);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(signInSchema),
    validateOnMount: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const res = await signIN({
          email: values.email,
          password: values.password,
        });
        const { token, data } = res as { token: string; data: { user: User } };
        setLoading(false);
        if (token) {
          dispatch(setLogin({ token, user: data.user }));
          toast.success("Logged in successfully");
          router.push("/");
          resetForm();
        } else {
          toast.error((res as { message?: string }).message || "Login failed");
        }
      } catch (error: any) {
        console.error("Login error:", error.message);
        toast.error(error.message);
        setLoading(false);
      }
    },
  });

  const handleForgetPassword = async () => {
    try {
      setLoading(true);
      const res = (await forgerPassword({
        email: resetEmail,
      })) as ForgotPasswordResponse;
      setLoading(false);
      if (res as { message: string }) {
        toast.success(res.message);
        setResetEmail("");
        setShowForgotPassword(false);
      } else {
        toast.error((res as { message?: string }).message || "Failed to send reset link");
      }
    } catch (error: any) {
      console.error("Reset password error:", error.message);
      toast.error(error.message);
      setLoading(false);
    }
  }
  return (
    <>
      <Breadcrumb title={"Forget Password"} pages={["Forget Password"]} />


        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
              <div className="text-center mb-11">
                <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Reset Your Password
                </h2>
                <p>Enter your new password below</p>
              </div>

              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2.5">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email"
                      className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red text-sm">{formik.errors.email}</p>
                    )}
                  </div>

                  <div className="mb-5">
                    <label htmlFor="password" className="block mb-2.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your password"
                        // autoComplete="on"
                        className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-dark-5 hover:text-dark-3"
                      >
                        {showPassword ? (
                          <TbEyeClosed size={20} />
                        ) : (
                          <BsEye size={20} />
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red text-sm">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className={`w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 mt-7.5
    ${
      !formik.isValid || formik.isSubmitting
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-blue"
    }`}
                  >
                    Reset Password {loading && <ButtonLoader />}
                  </button>

                 

                

                 
                </form>
              </div>
            </div>
          </div>
        </section>
 
    </>
  );
};

export default Forgetpassword;
