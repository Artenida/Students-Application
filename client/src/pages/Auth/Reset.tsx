import React, { useContext, useState } from "react";
import { RecoveryContext } from "../../context/RecoveryProvider";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(RecoveryContext);

  if (!context) {
    throw new Error("RecoveryContext must be used within a RecoveryProvider");
  }

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const resetPassword = async () => {
    if (password === confirmPassword) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/resetPassword",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );

        if (response.ok) {
          navigate('/login')
        } else {
          console.log("Failed to reset password");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Reset Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Enter your new password</p>
            </div>
          </div>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                resetPassword();
              }}
              className="flex flex-col space-y-5"
            >
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="w-full py-2 text-white bg-custom-color4 rounded-lg"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
