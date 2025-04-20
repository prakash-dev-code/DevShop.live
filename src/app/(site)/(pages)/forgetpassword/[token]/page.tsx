import React from "react";
import { Metadata } from "next";
import Forgetpassword from "@/components/Auth/Forgetpassword";
export const metadata: Metadata = {
  title: "Forget Password | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const ForgetPasswordPage = ({ params }: { params: { token: string } }) => {
  const token = params.token;
 
  return (
    <main>
     
      <Forgetpassword token={token}/>
    </main>
  );
};

export default ForgetPasswordPage;
