'use client';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useApi } from '@/services/apiServices';
import { signInSchema } from '@/shared/schemas/formSchema';
import { useFormik } from 'formik';
import Link from 'next/link';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { TbEyeClosed } from 'react-icons/tb';
import { toFormikValidationSchema } from 'zod-formik-adapter';
// import { useAppSelector } from "@/redux/store";
import { useDispatch } from 'react-redux';
import { setLogin } from '@/redux/features/auth-slice';
import { User } from '@/types/common';
import ButtonLoader from '@/components/Common/buttonLoader';
import { useRouter } from 'next/navigation';
type ForgotPasswordResponse = {
  status: 'success' | 'error'; // or just "success" if you expect only that
  message: string;
};
const Signin = () => {
  const { signIN, forgerPassword } = useApi();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
          toast.success('Logged in successfully');
          router.push('/');
          resetForm();
        } else {
          toast.error((res as { message?: string }).message || 'Login failed');
        }
      } catch (error: any) {
        console.error('Login error:', error.message);
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
        setResetEmail('');
        setShowForgotPassword(false);
      } else {
        toast.error((res as { message?: string }).message || 'Failed to send reset link');
      }
    } catch (error: any) {
      console.error('Reset password error:', error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/users/auth/google`;
  };
  return (
    <>
      <Breadcrumb title={'Signin'} pages={['Signin']} />

      {/* forget password input  */}
      {showForgotPassword ? (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
              <div className="text-center mb-11">
                <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                  Forget Passowrd
                </h2>
                <p>Enter your email to reset password</p>
              </div>

              <input
                type="email"
                id="resetEmail"
                name="resetEmail"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
              <button
                type="button"
                onClick={() => handleForgetPassword()}
                disabled={!resetEmail}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg mt-4 ease-out duration-200 hover:bg-blue"
              >
                Send Reset Link {loading && <ButtonLoader />}
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-lg mt-4 ease-out duration-200 hover:opacity-80"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
              <div className="text-center mb-11">
                <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                  Sign In to Your Account
                </h2>
                <p>Enter your detail below</p>
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
                        type={showPassword ? 'password' : 'text'}
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
                        {showPassword ? <TbEyeClosed size={20} /> : <BsEye size={20} />}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red text-sm">{formik.errors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className={`w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 mt-7.5
    ${!formik.isValid || formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue'}`}
                  >
                    Sign in to account {loading && <ButtonLoader />}
                  </button>
                </form>
                <div
                  onClick={() => setShowForgotPassword(true)}
                  className="block text-center cursor-pointer text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
                >
                  Forget your password?
                </div>

                <span className="relative z-1 block font-medium text-center mt-4.5">
                  <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
                  <span className="inline-block px-3 bg-white">Or</span>
                </span>

                <div className="flex flex-col gap-4.5 mt-4.5">
                  <button
                    onClick={() => loginWithGoogle()}
                    className="flex justify-center items-center gap-3.5 rounded-lg border border-gray-3 bg-gray-1 p-3 ease-out duration-200 hover:bg-gray-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_98_7461)">
                        <mask
                          id="mask0_98_7461"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                        >
                          <path d="M20 0H0V20H20V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_98_7461)">
                          <path
                            d="M19.999 10.2218C20.0111 9.53429 19.9387 8.84791 19.7834 8.17737H10.2031V11.8884H15.8267C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.999 13.2661 19.999 10.2218Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M10.2036 20C12.9586 20 15.2715 19.1111 16.9609 17.5777L13.7409 15.1332C12.8793 15.7223 11.7229 16.1333 10.2036 16.1333C8.91317 16.126 7.65795 15.7206 6.61596 14.9746C5.57397 14.2287 4.79811 13.1802 4.39848 11.9777L4.2789 11.9877L1.12906 14.3766L1.08789 14.4888C1.93622 16.1457 3.23812 17.5386 4.84801 18.512C6.45791 19.4852 8.31194 20.0005 10.2036 20Z"
                            fill="#34A853"
                          />
                          <path
                            d="M4.39899 11.9776C4.1758 11.3411 4.06063 10.673 4.05807 9.9999C4.06218 9.3279 4.1731 8.66067 4.38684 8.02221L4.38115 7.88959L1.1927 5.46234L1.0884 5.51095C0.372762 6.90337 0 8.44075 0 9.99983C0 11.5589 0.372762 13.0962 1.0884 14.4887L4.39899 11.9776Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M10.2039 3.86663C11.6661 3.84438 13.0802 4.37803 14.1495 5.35558L17.0294 2.59997C15.1823 0.90185 12.7364 -0.0298855 10.2039 -3.67839e-05C8.31239 -0.000477835 6.45795 0.514733 4.84805 1.48799C3.23816 2.46123 1.93624 3.85417 1.08789 5.51101L4.38751 8.02225C4.79107 6.82005 5.5695 5.77231 6.61303 5.02675C7.65655 4.28119 8.91254 3.87541 10.2039 3.86663Z"
                            fill="#EB4335"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_98_7461">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Continue with Google
                  </button>

                  {/* <button className="flex justify-center items-center gap-3.5 rounded-lg border border-gray-3 bg-gray-1 p-3 ease-out duration-200 hover:bg-gray-2">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9997 1.83331C5.93773 1.83331 1.83301 6.04119 1.83301 11.232C1.83301 15.3847 4.45954 18.9077 8.10178 20.1505C8.55988 20.2375 8.72811 19.9466 8.72811 19.6983C8.72811 19.4743 8.71956 18.7338 8.71567 17.9485C6.16541 18.517 5.6273 16.8395 5.6273 16.8395C5.21032 15.7532 4.60951 15.4644 4.60951 15.4644C3.77785 14.8811 4.6722 14.893 4.6722 14.893C5.59272 14.9593 6.07742 15.8615 6.07742 15.8615C6.89499 17.2984 8.22184 16.883 8.74493 16.6429C8.82718 16.0353 9.06478 15.6208 9.32694 15.3861C7.2909 15.1484 5.15051 14.3425 5.15051 10.7412C5.15051 9.71509 5.5086 8.87661 6.09503 8.21844C5.99984 7.98167 5.68611 7.02577 6.18382 5.73115C6.18382 5.73115 6.95358 5.47855 8.70532 6.69458C9.43648 6.48627 10.2207 6.3819 10.9997 6.37836C11.7787 6.3819 12.5635 6.48627 13.2961 6.69458C15.0457 5.47855 15.8145 5.73115 15.8145 5.73115C16.3134 7.02577 15.9995 7.98167 15.9043 8.21844C16.4921 8.87661 16.8477 9.715 16.8477 10.7412C16.8477 14.351 14.7033 15.146 12.662 15.3786C12.9909 15.6702 13.2838 16.2423 13.2838 17.1191C13.2838 18.3766 13.2732 19.3888 13.2732 19.6983C13.2732 19.9485 13.4382 20.2415 13.9028 20.1492C17.5431 18.905 20.1663 15.3833 20.1663 11.232C20.1663 6.04119 16.0621 1.83331 10.9997 1.83331Z"
                        fill="#15171A"
                      />
                    </svg>
                    Sign Up with Github
                  </button> */}
                </div>

                <p className="text-center mt-6">
                  Don&apos;t have an account?
                  <Link
                    href="/signup"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    Sign Up Now!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Signin;
