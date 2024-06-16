import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const LoginChat: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading, login } = useLogin();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-400 mb-6">
          Chat with
          <span className="text-custom-color3">  Edu</span>
          <span className="text-custom-color4">Connect</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/registerChat" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginChat;
