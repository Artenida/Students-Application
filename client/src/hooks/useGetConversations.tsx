import { useEffect, useState } from "react";

interface Conversation {
  _id: string;
  username: string;
}

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/usersChat");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        const formattedData = data.map((conversation: any) => ({
          id: conversation._id, 
          username: conversation.username,
        }));
        setConversations(formattedData);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
