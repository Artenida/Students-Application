import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";

const LoginChat: React.FC = () => {
  const navigate = useNavigate();
  // const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { currentUser } = useAppSelector(selectUser);
  const username = currentUser?.user?.username;

  const { loading, login } = useLogin();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(username, password);
    navigate("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12">
      <div className="w-full max-w-md p-6 rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-400 mb-6">
          Chat with
          <span className="text-custom-color3"> Edu</span>
          <span className="text-custom-color4">Connect</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* <div className="mb-4">
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
          </div> */}

          <div className="mb-4">
            <label className="label p-2">
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
          {/* <Link to="/registerChat" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Don't have an account?
          </Link> */}

          <div>
            <button
              className="btn btn-block btn-md mt-2 bg-custom-color4 hover:bg-gray-400 text-white text-xl"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Start using chat"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 p-4 bg-red-100 rounded-md text-gray-700">
        <p className="mb-2">
          Note: The username on the chat is the username you have provided on
          your application!
        </p>
        <p className="mb-2">
          📝If you're using the chat for the first time, you need to provide a
          password for the chat
        </p>
        <p>
          📝If you have previously used it, please provide the same password!
        </p>
      </div>
    </div>
  );
};

export default LoginChat;
