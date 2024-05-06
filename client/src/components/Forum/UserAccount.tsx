import React, { useState } from "react";
import moment from "moment";
import profile from "../../assets/userProfile.jpg";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { selectPost } from "../../redux/forum/postSlice";
import { Link } from "react-router-dom";

interface AuthorProps {
  authorName: string;
  profile_picture: string | undefined;
  createdAt?: Date;
  userId: string;
  postId?: string;
  bio?: string;
}

const UserAccount: React.FC<AuthorProps> = ({
  authorName,
  profile_picture,
  createdAt,
  userId,
  postId,
  bio,
}) => {
  const formattedDate = moment(createdAt).format("MMMM Do YYYY");
  const imagePath = profile_picture ? profile_picture.replace(/\\/g, "/") : "";
  const { currentUser } = useAppSelector(selectUser);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // const handleOptionSelect = (option: string) => {
  //   setShowOptions(false);
  //   if (option === "edit") {
  //     console.log("Edit")
  //   } else if (option === "delete") {
  //     console.log("Delete")
  //   }
  // };

  return (
    <div className="flex justify-between flex-nowrap items-center relative">
      <div className="flex items-center gap-x-2">
      <Link key={userId} to={`/writers/${userId}`}>
        {profile_picture ? (
          <img
            src={`http://localhost:5000/${imagePath}`}
            alt="post profile"
            className="h-[50px] w-[50px] rounded-full"
          />
        ) : (
          <img
            src={profile}
            alt="Profile"
            className="h-[50px] w-[50px] rounded-full"
          />
        )}
        <div className="flex flex-col gap-1">
          <h4 className="font-bold italic text-custom-color3 text-sm">
            {authorName}
          </h4>
          <h3 className="text-gray-500 text-sm">{createdAt && formattedDate}</h3>
          <h3 className="text-gray-500 text-sm">{bio}</h3>
        </div>
        </Link>
      </div>
      {currentUser?.user?.id === userId && (
        <div className="relative">
          <div className="mr-2 cursor-pointer" onClick={toggleOptions}>
            <BsThreeDots className="text-xl" />
          </div>
          {showOptions && (
            <div className="absolute w-32 right-0 mt-2 bg-white shadow-lg rounded-md py-1">
              <Link to={`/updatePost/${postId}`}><div
                className="cursor-pointer px-2 py-2 hover:bg-gray-100"
                // onClick={() => handleOptionSelect("edit")}
              >
                Edit Post
              </div>
              </Link>
              <Link to={`/updatePost/${postId}`}>
              <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-100"
                // onClick={() => handleOptionSelect("delete")}
              >
                Delete Post
              </div>
              </Link>
              
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAccount;
