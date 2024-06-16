import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addMessage } from '../redux/chat/conversationSlice';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.conversation.messages);
  const selectedConversation = useSelector((state: RootState) => state.conversation.selectedConversation);

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
