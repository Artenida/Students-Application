import Comments from "./Comments";
import UserAccount from "./UserAccount";
import userProfile from "../../assets/cover1.jpg";
import ImageSlider from "../ImageSlider";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa6";

export interface BlogCardProps {
  posts: Paginated[] | null;
}

export interface Paginated {
  id: string;
  images: Image[];
  title: string;
  username: string;
  profile_picture: string | undefined;
  description: string;
  createdAt: Date;
  user_id: string;
}

export interface Image {
  url: string;
}

const Card: React.FC<Paginated> = ({
  id,
  username,
  createdAt,
  title,
  description,
  profile_picture,
  images,
  user_id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowReadMore = description.length > 300;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const [showComment, setShowComment] = useState(false);

  const handleCommentClick = () => {
    setShowComment((prevState) => !prevState);
  };

  return (
    <div className="md:items-end mb-8 flex mt-4">
      <div className="bg-white w-full md:w-[800px] h-auto rounded-lg px-4 pt-4 md:flex-shrink-0 shadow-md hover:shadow-lg">
        <div className="flex flex-col">
          <div className="mb-4 md:mb-0 md:mr-4 md:flex-shrink-0">
            <UserAccount
              authorName={username}
              profile_picture={profile_picture}
              createdAt={createdAt}
              userId={user_id}
            />
          </div>
          <div className="flex flex-col mt-2">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2">
              {isExpanded
                ? description
                : shouldShowReadMore
                ? description.substring(0, 300) + "..."
                : description}
            </p>
            {shouldShowReadMore && (
              <span
                className="flex justify-end text-sm text-custom-color3 cursor-pointer"
                onClick={toggleDescription}
              >
                {isExpanded ? "Read less..." : "Read more..."}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <ImageSlider images={images} />
        </div>
        <div className="mt-4 border-2 rounded-xl border-gray-100"></div>
        <div
          className="my-2 p-2 flex justify-end items-center gap-2 cursor-pointer"
          onClick={handleCommentClick}
        >
          <FaRegCommentDots className="text-2xl" />
          <h2 className="text-lg">Comment</h2>
        </div>
        {showComment && <Comments postId = {id}/>}
      </div>
    </div>
  );
};

export default Card;
