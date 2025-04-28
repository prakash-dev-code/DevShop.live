// import { useRouter } from "next/router";
import { AppRoutes } from "@/constants/routes";
import { setLogout } from "@/redux/features/auth-slice";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";

const CustomSignIn = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const handleOptionClick = (option) => {
    if (option.value === "/logout") {
      dispatch(setLogout()); // 🔁 Make sure you have a logout action
      router.push("/signin"); // or redirect to home
      setIsOpen(false);
      toast.success("Logged out successfully");
      return;
    }

    const protectedRoutes = [
      AppRoutes.MyAccount,
      AppRoutes.Orders,
      AppRoutes.Wishlist,
      AppRoutes.Rewards,
    ];

    if (protectedRoutes.includes(option.value) && !isLoggedIn) {
      const signInOption = options.find((opt) => opt.value === "/signin");
      setSelectedOption(signInOption);
      router.push("/signin");
    } else {
      setSelectedOption(option);
      router.push(option.value);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div
          className={` flex items-center gap-2.5 select-signIn whitespace-nowrap ${
            isOpen ? "select-arrow-active" : ""
          }`}
          onClick={toggleDropdown}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C9.37666 1.25 7.25001 3.37665 7.25001 6C7.25001 8.62335 9.37666 10.75 12 10.75C14.6234 10.75 16.75 8.62335 16.75 6C16.75 3.37665 14.6234 1.25 12 1.25ZM8.75001 6C8.75001 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6C15.25 7.79493 13.7949 9.25 12 9.25C10.2051 9.25 8.75001 7.79493 8.75001 6Z"
              fill="#3C50E0"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 12.25C9.68646 12.25 7.55494 12.7759 5.97546 13.6643C4.4195 14.5396 3.25001 15.8661 3.25001 17.5L3.24995 17.602C3.24882 18.7638 3.2474 20.222 4.52642 21.2635C5.15589 21.7761 6.03649 22.1406 7.22622 22.3815C8.41927 22.6229 9.97424 22.75 12 22.75C14.0258 22.75 15.5808 22.6229 16.7738 22.3815C17.9635 22.1406 18.8441 21.7761 19.4736 21.2635C20.7526 20.222 20.7512 18.7638 20.7501 17.602L20.75 17.5C20.75 15.8661 19.5805 14.5396 18.0246 13.6643C16.4451 12.7759 14.3136 12.25 12 12.25ZM4.75001 17.5C4.75001 16.6487 5.37139 15.7251 6.71085 14.9717C8.02681 14.2315 9.89529 13.75 12 13.75C14.1047 13.75 15.9732 14.2315 17.2892 14.9717C18.6286 15.7251 19.25 16.6487 19.25 17.5C19.25 18.8078 19.2097 19.544 18.5264 20.1004C18.1559 20.4022 17.5365 20.6967 16.4762 20.9113C15.4193 21.1252 13.9742 21.25 12 21.25C10.0258 21.25 8.58075 21.1252 7.5238 20.9113C6.46354 20.6967 5.84413 20.4022 5.4736 20.1004C4.79033 19.544 4.75001 18.8078 4.75001 17.5Z"
              fill="#3C50E0"
            />
          </svg>

          <div>
            {isLoggedIn ? (
              <p className="font-medium text-custom-base text-dark">
                {user.name.split(" ")[0]}
              </p>
            ) : (
              <>
                <span className="block text-2xs text-dark-4 uppercase">
                  account
                </span>
                <p className="font-medium text-custom-sm text-dark">Sign In</p>
              </>
            )}
          </div>
        </div>
        <div
          className={`select-items ${isOpen ? "" : "select-hide"}`}
          style={{ width: "200px" }}
        >
          {(isLoggedIn
            ? [
                ...options.filter(
                  (opt) => opt.value !== "/signin" && opt.value !== "/signup"
                ),
                {
                  label: "Logout",
                  value: "/logout",
                  icon: <FiLogOut size={18} color="blue" />,
                },
              ]
            : options
          ).map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={` flex flex-row gap-2 justify-start items-center select-item ${
                selectedOption === option ? "same-as-selected" : ""
              }`}
            >
              <span>{option?.icon}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomSignIn;
