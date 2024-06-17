import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

interface Conversation {
  _id: string;
  username: string;
}

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { authUser } = useAuthContext();
  console.log(authUser?.token)

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/usersChat", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authUser?.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch conversations");
        }
        const formattedData = data.map((conversation: any) => ({
          id: conversation._id,
          username: conversation.username,
        }));
        setConversations(formattedData);
      } catch (error: any) {
        console.log(error.message);
        // Handle errors as needed
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      getConversations();
    }
  }, [authUser]);

  return { loading, conversations };
};

export default useGetConversations;
