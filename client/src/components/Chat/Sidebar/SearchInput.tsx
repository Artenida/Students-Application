import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedConversation } from "../../../redux/chat/conversationSlice";
import useGetConversations from "../../../hooks/useGetConversations";

const SearchInput: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();
  const { conversations } = useGetConversations();
  const selectedConversation = useSelector(
    (state: RootState) => state.conversation.selectedConversation
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) {
      console.log("Search term is required");
      return;
    }

    if (search.length < 3) {
      console.log("Search term must be at least 3 characters long");
      return;
    }

    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch("");
    } else {
      console.log("No such user found!");
      // toast.error("No such user found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
