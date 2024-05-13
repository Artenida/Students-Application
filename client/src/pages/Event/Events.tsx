import { useEffect } from "react";
import Banner from "../../components/Events/Banner";
import Card from "../../components/Events/Card";
import Searchbar from "../../components/Searchbar";
import { selectEvent } from "../../redux/forum/eventSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { retrieveAllEvents } from "../../api/eventThunk";

const Events = () => {
  const dispatch = useAppDispatch();
  const { currentEvents } = useAppSelector(selectEvent);

  useEffect(() => {
    dispatch(retrieveAllEvents());
  }, [dispatch]);
  console.log(currentEvents);
  return (
    <div className=" flex flex-col pl-[70px] md:pl-[100px]">
      <div className="flex h-[300px] -z-10">
        <Banner />
        {/* <Searchbar onChange={} /> */}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
        {currentEvents?.map((event) => (
          <Card
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            user_id={event.user_id}
            profile_picture={event.profile_picture}
            music={event.music}
            cost={event.cost}
            email={event.email}
            image={event.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
