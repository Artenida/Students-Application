import Comments from "./Comments";
import UserAccount from "./UserAccount";
import userProfile from "../../assets/cover1.jpg";

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
}) => {
  return (
    <div className="mb-8 md:flex"> 
      <div className="bg-white w-full md:w-[700px] h-auto rounded-lg p-4 md:flex-shrink-0">
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-4 md:flex-shrink-0">
            <UserAccount
              authorName={username}
              profile_picture={profile_picture}
              createdAt={createdAt}
            />
          </div>
          <div className="flex flex-col"> 
            <h2 className="font-semibold">
              {title.length > 30 ? title.substring(0, 30) + "..." : title}
            </h2>
            <p className="mt-2">
              {description.length > 145
                ? description.substring(0, 100) + "..."
                : description}
            </p>
          </div>
        </div>
        <div className="mt-4">
          {images && images.length > 0 && (
            <img
              src={`http://localhost:5000/${images[0]?.url?.replace(
                /\\/g,
                "/"
              )}`}
              alt="forumPicture"
              className="w-full object-cover object-center h-64"
            />
          )}
        </div>
        <div>
          <Comments />
        </div>
      </div>
    </div>
  );
};


export default Card;
