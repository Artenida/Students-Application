import React, { useContext, useState } from "react";
import { RecoveryContext } from "../../context/RecoveryProvider";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(RecoveryContext);

  if (!context) {
    throw new Error("RecoveryContext must be used within a RecoveryProvider");
  }

  const { setEmail, email, setOTP } = context;
  const [inputEmail, setInputEmail] = useState<string>("");

  const navigateToOtp = async () => {
    if (inputEmail) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
    //   console.log(OTP);
      setOTP(OTP);
      setEmail(inputEmail);

      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/forgotPassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              OTP,
              recipient_email: inputEmail,
            }),
          }
        );

        if (response.ok) {
          //   setPage("otp");
          navigate("/otp");
        } else {
          console.log("Failed to send recovery email");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter your email");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Forgot Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Please enter your email address to recover your password</p>
            </div>
          </div>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigateToOtp();
              }}
              className="flex flex-col space-y-5"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full py-2 text-white bg-custom-color4 rounded-lg"
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
