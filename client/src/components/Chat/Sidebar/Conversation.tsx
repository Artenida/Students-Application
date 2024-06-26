import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedConversation } from "../../../redux/chat/conversationSlice";
import { useSocketContext } from "../../../context/SocketContext";
import avatar from "../../../assets/avatar.png"
interface ConversationProps {
  conversation: {
    id: string;
    username: string;
  };
  lastIdx: boolean;
  emoji: string;
}

const Conversation: FC<ConversationProps> = ({
  conversation,
  lastIdx,
  emoji,
}) => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?.id === conversation.id; // Adjusted to check against conversation._id
  const isOnline = onlineUsers.includes(conversation.id);

  const handleConversationSelect = () => {
    dispatch(setSelectedConversation(conversation)); // Pass conversation._id as string
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-custom-color1 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-custom-color2" : ""
        }`}
        onClick={handleConversationSelect}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img src={avatar} alt='user avatar' />
					</div>
				</div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-6 justify-between">
            <p className="font-bold text-black">{conversation.username}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
