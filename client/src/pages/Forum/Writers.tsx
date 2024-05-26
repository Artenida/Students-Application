import { useParams } from "react-router-dom";
import { selectPost } from "../../redux/forum/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getWritersPosts } from "../../api/postThunk";
import Card from "../../components/Forum/Card";
import MyAccount from "../../components/Forum/MyAccount";
import { getUser } from "../../api/userThunk";
import { selectUser } from "../../redux/user/userSlice";

export interface WritersType {
    id: string;
    images: Image[];
    title: string;
    username: string;
    email: string;
    profile_picture: string;
    bio: string;
    description: string;
    createdAt: Date;
    user_id: string;
  }
  
  export interface Image {
    url: string;
  }

const Writers = () => {
    const dispatch = useAppDispatch();
    const { writersPosts, retrieveError, loading } = useAppSelector(selectPost);
    const { userId } = useParams();
  
    useEffect(() => {
      dispatch(getWritersPosts(userId));
    }, [dispatch, userId]);


  const typedPosts = writersPosts as WritersType[];

  const { username, bio, email, profile_picture, user_id } = typedPosts?.[0] || {};

    return (
      <div className="pt-24">
      <div className="w-full flex flex-col justify-center items-center">
        <MyAccount
          username={username}
          bio={bio}
          email={email}
          profile_picture={profile_picture}
          user_id={user_id}
        />
        <div className="-z-50 mt-12 ml-24 sm:mr-8 md:mr-0 md:ml-0">
          {writersPosts.length > 0 && writersPosts.map((writer: WritersType, index: number) => (
            <Card
              key={writer.id}
              username={writer.username}
              createdAt={writer.createdAt}
              title={writer.title}
              description={writer.description}
              images={writer.images}
              id={writer.id}
              profile_picture={writer.profile_picture}
              user_id={writer.user_id}
            />
          ))}
        </div>
      </div>
    </div>
    );
};

export default Writers;
