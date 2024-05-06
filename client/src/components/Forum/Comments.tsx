import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createComment, getCommentsForPost } from "../../api/commentThunk";
import { selectComment } from "../../redux/forum/commentSlice";
import CommentItem from "./CommentItem ";
import FormInputsComponent from "../FormInputsComponent";
import { IoSend } from "react-icons/io5";
import { selectUser } from "../../redux/user/userSlice";

const Comments = ({ postId }: {postId: string}) => {
  const dispatch = useAppDispatch();
  const { allComments } = useAppSelector(selectComment);
  const [comment_text, setCommentText] = useState("");
  const {currentUser} = useAppSelector(selectUser);
  const userId = currentUser?.user?.id;
  
  useEffect(() => {
    dispatch(getCommentsForPost(postId));
  }, [dispatch, postId]);

  const handleCreateComment = () => {
    if(comment_text.trim() !== "") {
      dispatch(createComment({postId, userId, comment_text}));
      setCommentText("");
    }
  }

  return (
    <>
      {allComments ? allComments?.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      )) : "No comments for this post"}

      <div className="my-4 flex gap-4 items-center">
        <div className="w-[700px]">
          <FormInputsComponent 
            id="create" 
            placeholder="Write a comment"
            onChange={(e) => setCommentText(e.target.value)} />
        </div>
        <div className="rounded-full bg-custom-color1 p-3 cursor-pointer">
          <IoSend className="text-custom-color3" onClick={handleCreateComment}/>
        </div>
      </div>
    </>
  );
};

export default Comments;
