import React, { useEffect } from "react";
import profile from "../../assets/userProfile.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";
import { getUser } from "../../api/userThunk";

interface AuthorProps {
  authorName: string;
  profile_picture: string | undefined;
  userId: string;
}

const UserAccount: React.FC<AuthorProps> = ({
  authorName,
  profile_picture,
  userId,
}) => {
  const imagePath = profile_picture ? profile_picture.replace(/\\/g, "/") : "";

  return (
    <div className="flex justify-between flex-nowrap items-center relative">
      <div className="flex items-center gap-x-2">
        <Link key={userId} to={`/writers/${userId}`}>
          {profile_picture && profile_picture != null ? (
            <img
              src={`http://localhost:5000/${imagePath}`}
              alt="post profile"
              className="h-[35px] w-[35px] rounded-full"
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
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserAccount;
