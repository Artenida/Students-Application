import { useParams } from "react-router-dom";
import { selectPost } from "../../redux/forum/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getWritersPosts } from "../../api/postThunk";
import MyAccount from "../../components/Forum/MyAccount";
import Card from "../../components/Events/Card";
import { selectEvent } from "../../redux/forum/eventSlice";
import { getUsersEvents } from "../../api/eventThunk";

export interface UserEventTypes {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  music: string;
  cost?: string;
  image: string;
  user_id: string;
  username: string;
  email: string;
  bio: string;
  profile_picture: string;
  interested_fields: string;
}

export interface Image {
  url: string;
}

const UserEvents = () => {
  const dispatch = useAppDispatch();
  const {usersEvents} = useAppSelector(selectEvent);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUsersEvents(userId));
  }, [dispatch, userId]);

  const typedPosts = usersEvents as UserEventTypes[];

  const { username, bio, email, profile_picture, user_id, interested_fields } =
    typedPosts?.[0] || {};
    
    console.log(usersEvents)

    return (
    <div className="pt-24">
      <div className="w-full flex flex-col justify-center items-center">
        <MyAccount
          username={username}
          bio={bio}
          profile_picture={profile_picture}
          user_id={user_id}
          fields={interested_fields}
        />
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-4 md:px-24 sm:px-4 px-4">
          {usersEvents && usersEvents.length > 0 &&
            usersEvents.map((events: UserEventTypes, index: number) => (
              <Card
                key={events.id}
                id={events.id}
                title={events.title}
                description={events.description}
                date={events.date}
                time={events.time}
                music={events.music}
                cost={events.cost}
                email={events.email}
                location={events.location}
                user_id={events?.user_id}
                image={events.image}
                profile_picture={events.profile_picture}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserEvents;
