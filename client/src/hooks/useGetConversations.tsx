import { useEffect, useState } from "react";

// Define an interface for the conversation object
interface Conversation {
  _id: string;
  // Add other properties of the conversation object as needed
  username: string;
  // Example: username, text, timestamp, etc.
}

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]); // Initialize with an empty array of Conversation type

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        // Assuming your API response is an array of objects with 'id' and 'username' properties
        const formattedData = data.map((conversation: any) => ({
          id: conversation.id, // Ensure 'id' is fetched correctly from your API response
          username: conversation.username,
          // Add other properties you need from the API response
        }));
        setConversations(formattedData);
      } catch (error: any) {
        console.log(error.message);
        // Handle errors appropriately (e.g., toast.error(error.message))
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
