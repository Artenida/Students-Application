import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from "../context/SocketContext";
import { addMessage } from "../redux/chat/conversationSlice";
import { Message } from "../redux/chat/conversationSlice";
import notificationSound from "../assets/sound/notification.mp3"


const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      const handleMessage = (newMessage: Message) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
			  sound.play();
        dispatch(addMessage(newMessage));
      };

      socket.on("newMessage", handleMessage);

      return () => {
        socket.off("newMessage", handleMessage);
      };
    }
  }, [socket, dispatch]);
};

export default useListenMessages;
