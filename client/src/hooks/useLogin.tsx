import { useState } from "react";
// import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export interface AuthUser {
    _id: string;
    username: string;
    password: string;
    token: string;
  }
  
  export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: (user: AuthUser | null) => void;
  }

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/authChat/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: AuthUser | { error: string } = await res.json();
      if ("error" in data) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error: any) {
    //   toast.error(error.message);
    console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username: string, password: string): boolean {
  if (!username || !password) {
    console.log("Please fill in all fields")
    // toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
