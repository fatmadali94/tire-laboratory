import React, { useState } from "react";
import SigninForm from "../components/authentication/SigninForm";
import SignupForm from "../components/authentication/SignupForm";
import { authBg } from "../assets/assets";

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 text-white font-sans font-bold bg-black min-h-screen pl-7">
        {showSignup ? (
          <SignupForm setShowSignup={setShowSignup} />
        ) : (
          <SigninForm setShowSignup={setShowSignup} />
        )}
      </div>

      <div className="banner col-span-8 text-white font-sans font-bold" />
      <style>{`
        .banner {
          background: url(${authBg});
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
