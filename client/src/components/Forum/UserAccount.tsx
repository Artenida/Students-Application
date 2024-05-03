import React from "react";
import moment from "moment";
import profile from "../../assets/userProfile.jpg";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { selectPost } from "../../redux/forum/postSlice";

interface AuthorProps {
  authorName: string;
  profile_picture: string | undefined;
  createdAt: Date;
  userId: string;
}

const UserAccount: React.FC<AuthorProps> = ({
  authorName,
  profile_picture,
  createdAt,
  userId,
}) => {
  const formattedDate = moment(createdAt).format("MMMM Do YYYY");
  const imagePath = profile_picture ? profile_picture.replace(/\\/g, "/") : "";
  const { currentUser } = useAppSelector(selectUser);
  const { currentPost } = useAppSelector(selectPost);

  return (
    <div className="flex justify-between flex-nowrap items-center">
      <div className="flex items-center gap-x-2">
        {profile_picture ? (
          <img
            src={`http://localhost:5000/${imagePath.replace(/\\/g, "/")}`}
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
          <h3 className="text-gray-500 text-sm">{formattedDate}</h3>
        </div>
      </div>
      {currentUser?.user?.id === userId ? (
        <div className="mr-2 cursor-pointer">
          <BsThreeDots className="text-xl" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserAccount;
