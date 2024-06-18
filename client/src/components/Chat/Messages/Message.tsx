import { useSelector } from "react-redux";
import { useAuthContext } from "../../../context/AuthContext";
import { extractTime } from "../../../utils/extractTime";
import { RootState } from "../../../redux/store";

interface Message {
	_id: string;
	senderId?: string; 
	message: string;
	timestamp: number;
	createdAt?: string;
	shouldShake?: boolean;
  }

  interface Props {
	message: Message;
  }
  
  const Message: React.FC<Props> = ({ message }) => {
	const { authUser } = useAuthContext();
	// const selectedConversation = useSelector((state: RootState) => state.conversation.selectedConversation);
	const fromMe = message?.senderId === authUser?._id;
	const formattedTime = extractTime(message?.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
