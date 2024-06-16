import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from "../context/SocketContext";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { setMessages } from "../redux/chat/conversationSlice";

interface Message {
	_id: string;
	text: string;
	timestamp: number;
  shouldShake?: boolean; 
  }

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useAppSelector((state: RootState) => state.conversation.messages);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: Message) => {
        newMessage.shouldShake = true;
        // const sound = new Audio(notificationSound);
        // sound.play();
        dispatch(setMessages([...messages, newMessage]));
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, dispatch, messages]);
};

export default useListenMessages;
