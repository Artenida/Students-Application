import React, { useState } from 'react';
import UserAccount from './UserAccount';
import profile from '../../assets/userProfile.jpg';
import { useAppDispatch } from '../../redux/hooks';
import { deleteComment } from '../../api/commentThunk';

const CommentItem = ({ comment } : {comment: any}) => {
  const dispatch = useAppDispatch();
  const [showDeleteOption, setShowDeleteOption] = useState(false);

  const handleCommentClick = () => {
    setShowDeleteOption(!showDeleteOption);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <div className="mt-4 rounded-xl border-gray-100">
      <div className="flex w-auto gap-4 mt-8">
        <div>
          <UserAccount postId={comment.id} authorName={comment.username} profile_picture={comment.profile_picture || profile} bio={comment.bio} userId={comment.user_id} />
        </div>
        <div onClick={handleCommentClick} className="relative cursor-pointer">
          <h2>{comment.comment_text}</h2>
          {showDeleteOption && (
            <div className="absolute top-0 right-0 bg-white py-1 px-5 shadow">
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
          <h2 className="mt-1 text-custom-color3 font-semibold">{comment.date_created}</h2>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;