import React, { useState } from "react";
import profile from "../../assets/userProfile.jpg";
import { useAppDispatch } from "../../redux/hooks";
import { deleteComment, getCommentsForPost } from "../../api/commentThunk";
import CommentsUser from "./CommentsUser";
import { formatDate } from "../../utils/dates";

const CommentItem = ({ comment }: { comment: any }) => {
  const dispatch = useAppDispatch();
  const [showDeleteOption, setShowDeleteOption] = useState(false);

  const handleCommentClick = () => {
    setShowDeleteOption(!showDeleteOption);
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.id)).then(() => {
      dispatch(getCommentsForPost(comment?.id));
    });
  };

  return (
    <div className="comment-item rounded-xl border-gray-100 p-2">
    <div className="flex w-auto gap-4">
      {comment ? (
        <>
          <div>
            <CommentsUser
              postId={comment.id}
              authorName={comment.username}
              profile_picture={comment.profile_picture || profile}
              userId={comment.user_id}
            />
          </div>
          <div onClick={handleCommentClick} className="relative cursor-pointer">
            <h2>{comment.comment_text}</h2>
            {showDeleteOption && (
              <div className="absolute top-0 right-0 bg-white py-1 px-5 shadow">
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
            <h2 className="text-gray-400 text-xs">{formatDate(comment.date_created)}</h2>
          </div>
        </>
      ) : (
        <h2>Be the first to comment on this post</h2>
      )}
    </div>
  </div>
  );
};

export default CommentItem;
