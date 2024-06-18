import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { loading, signup, error } = useSignup();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signup({ username, password, confirmPassword });
    navigate("/loginChat");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pt-12">
      <div className="w-full max-w-md p-6 rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          <span className="text-gray-400 ">Register to chat with</span>
          <span className="text-custom-color3"> Edu</span>
          <span className="text-custom-color4">Connect</span>
        </h1>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <Link
            to="/loginChat"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-md mt-2 border bg-custom-color4 hover:bg-gray-400 text-white text-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 p-4 bg-red-100 rounded-md text-gray-700">
        <p className="mb-2">
          Note: This section is optional, you may not use it if you don't need
          too!
        </p>
        <p className="mb-2">
          The name you choose during registration will be your display name in
          the chat, visible to other users.
        </p>
        <p>Please select a simple and easy-to-remember name.</p>
      </div>
    </div>
  );
};

export default SignUp;
