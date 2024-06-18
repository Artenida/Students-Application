import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedConversation } from "../../../redux/chat/conversationSlice";
import { useAuthContext } from "../../../context/AuthContext";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  useEffect(() => {
    // Cleanup function (unmounts)
    return () => {
      dispatch(setSelectedConversation(null));
    };
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-custom-color1 rounded-lg px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-custom-color4 font-bold">
              {selectedConversation.username}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-custom-color4 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.username}</p>
        <p>Start messaging your friends</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
