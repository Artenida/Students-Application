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

const username = "Artenida";
const createdAt = new Date();
const title = "New title";
const description = `New description dcbhsbcxbdcxsxsaxasxndncfddcbbbbbbbbsxak
xcdsxdcdc dbkdncxxxxxxxxxx xxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxdxs 
cnsxwskxnss sssssssssssssssss
cdcccccccccccccccccccccksn`;

const Card = () => {
  return (
    <div>
      <div className="bg-white w-[700px] h-auto rounded-lg p-4">
        <div className="">
          <UserAccount
            authorName={username}
            profile_picture={userProfile}
            createdAt={createdAt}
          />
        </div>
        <div className="mt-4">
          <h2 className="font-semibold">
            {title.length > 30 ? title.substring(0, 30) + "..." : title}
          </h2>
          <p className="mt-2">
            {description.length > 145
              ? description.substring(0, 100) + "..."
              : description}
          </p>
        </div>
        <div className="mt-4">
          {/* {post.images && post.images.length > 0 && (
                  <img
                    src={`http://localhost:5000/${post.images[0].url.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="blogPicture"
                    className="w-full object-cover object-center h-64"
                  />
              )} */}
          <img src={userProfile} alt="" className="w-full h-[250px]" />
        </div>
        <div>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default Card;
