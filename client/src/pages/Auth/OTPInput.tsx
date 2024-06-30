import React, { useState, useContext, useEffect } from "react";
import { RecoveryContext } from "../../context/RecoveryProvider";
import { useNavigate } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(RecoveryContext);
  
  if (!context) {
    throw new Error("RecoveryContext must be used within a RecoveryProvider");
  }

  const { email, otp } = context;
  const [timerCount, setTimer] = useState<number>(60);
  const [OTPinput, setOTPinput] = useState<string[]>(["", "", "", ""]);
  const [disable, setDisable] = useState<boolean>(true);

  const resendOTP = async () => {
    if (disable) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OTP: otp,
          recipient_email: email,
        }),
      });

      if (response.ok) {
        setDisable(true);
        alert("A new OTP has successfully been sent to your email.");
        setTimer(60);
      } else {
        console.log("Failed to send recovery email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = () => {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate('/reset')
    } else {
      alert("The code you have entered is not correct, try again or re-send the link");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount > 0 ? lastTimerCount - 1 : lastTimerCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOTP = [...OTPinput];
    newOTP[index] = event.target.value;
    setOTPinput(newOTP);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {OTPinput.map((value, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        maxLength={1}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={value}
                        onChange={handleChange(index)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="button"
                      onClick={verifyOTP}
                      className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-custom-color4 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <button
                      type="button"
                      disabled={disable}
                      className={`flex flex-row items-center ${disable ? "text-gray-400" : "text-blue-500 underline cursor-pointer"}`}
                      onClick={resendOTP}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
