import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { setMessages } from "../redux/chat/conversationSlice";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { authUser } = useAuthContext();
  const messages = useAppSelector(
    (state: RootState) => state.conversation.messages
  );
  const selectedConversation = useAppSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (selectedConversation && selectedConversation.id) {
          const res = await fetch(
            `http://localhost:5000/api/messages/${selectedConversation.id}`,
            {
              // method: "GET",
              // credentials: "include",
              headers: {
                Authorization: `Bearer ${authUser?.token}`,
              },
            }
          );
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          dispatch(setMessages(data));
        } else {
          throw new Error("selectedConversation is null or undefined");
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) {
      getMessages();
    }
  }, [dispatch, selectedConversation, authUser]);

  return { messages, loading };
};

export default useGetMessages;
