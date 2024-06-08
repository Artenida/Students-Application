import { useParams } from "react-router-dom";
import { selectPost } from "../../redux/forum/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getWritersPosts } from "../../api/postThunk";
import Card from "../../components/Forum/Card";
import MyAccount from "../../components/Forum/MyAccount";

export interface WritersType {
  id: string;
  images: Image[];
  title: string;
  username: string;
  email: string;
  profile_picture: string;
  bio: string;
  description: string;
  created_at: Date;
  user_id: string;
  interested_fields: string;
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

  const { username, bio, email, profile_picture, user_id, interested_fields } =
    typedPosts?.[0] || {};

    return (
    <div className="pt-24">
      <div className="w-full flex flex-col justify-center items-center">
        <MyAccount
          username={username}
          bio={bio}
          email={email}
          profile_picture={profile_picture}
          user_id={user_id}
          fields={interested_fields}
          
        />
        <div className="mt-12 pl-12 mx-8">
          {writersPosts.length > 0 &&
            writersPosts.map((writer: WritersType, index: number) => (
              <Card
                key={writer.id}
                username={writer.username}
                created_at={writer.created_at}
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
