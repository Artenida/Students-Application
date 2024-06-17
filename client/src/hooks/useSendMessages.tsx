import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addMessage } from '../redux/chat/conversationSlice';
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.conversation.messages);
  const selectedConversation = useSelector((state: RootState) => state.conversation.selectedConversation);
  const { authUser } = useAuthContext();
  console.log(selectedConversation?._id)

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation?._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser?.token}`,
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      dispatch(addMessage(data));
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
