import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

interface SignupData {
  username: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
  gender?: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ username, password, confirmPassword }: SignupData) => {
    const success = handleInputErrors({ username, password, confirmPassword });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/authChat/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputErrors = ({ username, password, confirmPassword }: SignupData): boolean => {
    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      console.error("Please fill in all fields");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      console.error("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      console.error("Password must be at least 6 characters");
      return false;
    }

    setError(null);
    return true;
  };

  return { loading, signup, error };
};

export default useSignup;
