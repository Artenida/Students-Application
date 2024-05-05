import Comments from "./Comments";
import UserAccount from "./UserAccount";
import userProfile from "../../assets/cover1.jpg";
import ImageSlider from "../ImageSlider";
import { useState } from "react";

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
  username,
  createdAt,
  title,
  description,
  profile_picture,
  images,
  user_id
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowReadMore = description.length > 300;

  const toggleDescription = () =>{ 
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="md:pl-44 md:items-end mb-8 flex"> 
      <div className="bg-white w-full md:w-[680px] h-auto rounded-lg p-4 md:flex-shrink-0 ">
        <div className="flex flex-col">
          <div className="mb-4 md:mb-0 md:mr-4 md:flex-shrink-0">
            <UserAccount
              authorName={username}
              profile_picture={profile_picture}
              createdAt={createdAt}
              userId = {user_id}
            />
          </div>
          <div className="flex flex-col mt-2"> 
            <h2 className="font-semibold">
              {title}
            </h2>
            <p className="mt-2">
              {isExpanded ? description : (shouldShowReadMore ? description.substring(0, 300) + "..." : description)}
            </p>
            {shouldShowReadMore && (
              <span className="flex justify-end text-sm text-custom-color3 cursor-pointer" onClick={toggleDescription}>
                {isExpanded ? "Read less..." : "Read more..."}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4">
          <ImageSlider images={images} />
        </div>
        <div>
          <Comments />
        </div>
      </div>
    </div>
  );
};


export default Card;
