import { FaRegCommentDots } from "react-icons/fa6";
import UserAccount from "./UserAccount";
import profile from "../../assets/userProfile.jpg";
import FormInputsComponent from "../FormInputsComponent";
import { IoSend } from "react-icons/io5";
import { useState } from "react";

const Comments = () => {
  const name = "Artenida";
  const bio = "Testing bio";
  const userId = "1";
  const [showDeleteOption, setShowDeleteOption] = useState(false);

  const handleCommentClick = () => {
    setShowDeleteOption(!showDeleteOption);
  };

  const handleDelete = () => {
    console.log("Comment deleted");
  };

  const handleCreateComment = () => {
    console.log("Comment created");
  }

  return (
    <>
      <div className="mt-4 border-2 rounded-xl border-gray-100"></div>
      <div className="flex gap-4 mt-8">
        <div>
          <UserAccount
            authorName={name}
            profile_picture={profile}
            bio={bio}
            userId={userId}
          />
        </div>
        <div onClick={handleCommentClick} className="relative cursor-pointer">
          <h2>the text will be displayed here</h2>
          {showDeleteOption && (
            <div className="absolute top-0 right-0 bg-white py-1 px-6 text-red-500 shadow hover:bg-gray-100">
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          <h2 className="mt-1 text-custom-color3 font-semibold">date</h2>
        </div>
      </div>
      <div className="my-4 flex gap-4 items-center">
        <div className="w-[700px]">
          <FormInputsComponent id="create" placeholder="Write a comment" />
        </div>
        <div className="rounded-full bg-custom-color1 p-3 cursor-pointer" onClick={handleCreateComment}>
          <IoSend className="text-custom-color3 " />
        </div>
      </div>
    </>
  );
};

export default Comments;
