import React, { useEffect } from "react";
import moment from "moment";
import profile from "../../assets/userProfile.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";
import { getUser } from "../../api/userThunk";

interface AuthorProps {
  authorName: string;
  profile_picture: string | undefined;
  createdAt?: Date;
  userId: string;
  postId: string;
}

const UserAccount: React.FC<AuthorProps> = ({
  authorName,
  profile_picture,
  createdAt,
  userId,
  postId,
}) => {
  const dispatch = useAppDispatch();
  const formattedDate = moment(createdAt).format("MMMM Do YYYY");
  const imagePath = profile_picture ? profile_picture.replace(/\\/g, "/") : "";
  const { currentUser } = useAppSelector(selectUser);
  const userID = currentUser?.user?.id;

  useEffect(() => {
    dispatch(getUser(userID));
  }, [dispatch, userID])

  return (
    <div className="flex justify-between flex-nowrap items-center relative">
      <div className="flex items-center gap-x-2">
        <Link key={userId} to={`/writers/${userId}`}>
          {profile_picture ? (
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
            {/* <h3 className="text-gray-500 text-sm">
              {createdAt && formattedDate}
            </h3> */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserAccount;
