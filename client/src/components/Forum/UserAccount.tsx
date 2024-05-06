import React, { useState } from "react";
import moment from "moment";
import profile from "../../assets/userProfile.jpg";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { selectPost } from "../../redux/forum/postSlice";
import { Link } from "react-router-dom";
import { deletePost } from "../../api/postThunk";
import { Dialog } from "../Dialog";

interface AuthorProps {
  authorName: string;
  profile_picture: string | undefined;
  createdAt?: Date;
  userId: string;
  postId: string;
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
  const dispatch = useAppDispatch();
  const formattedDate = moment(createdAt).format("MMMM Do YYYY");
  const imagePath = profile_picture ? profile_picture.replace(/\\/g, "/") : "";
  const { currentUser } = useAppSelector(selectUser);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteAccount = (postId: string) => {
    setSelectedPostId(postId);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedPostId) {
      dispatch(deletePost(selectedPostId)).then(() => {
        setIsDeleteDialogOpen(false);
      });
    }
  };

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
            <h3 className="text-gray-500 text-sm">
              {createdAt && formattedDate}
            </h3>
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
              <Link to={`/updatePost/${postId}`}>
                <div
                  className="cursor-pointer px-2 py-2 hover:bg-gray-100"
                >
                  Edit Post
                </div>
              </Link>
              <div
                className="cursor-pointer px-2 py-2 hover:bg-gray-100"
                onClick={() => handleDeleteAccount(postId)}
              >
                Delete Post
              </div>
            </div>
          )}
        </div>
      )}
       <Dialog
        isOpen={isDeleteDialogOpen}
        message="Are you sure you want to delete this post?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserAccount;
