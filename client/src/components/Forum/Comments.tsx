import { FaRegCommentDots } from "react-icons/fa6";

const Comments = () => {
  return (
    <div>
      <div className="mt-4 border-2 rounded-xl border-gray-100"></div>
      <div className="mt-2 p-2 flex justify-end items-center gap-2 cursor-pointer">
        <FaRegCommentDots className="text-2xl" />
        <h2 className="text-lg">Comment</h2>
      </div>
    </div>
  );
};

export default Comments;
