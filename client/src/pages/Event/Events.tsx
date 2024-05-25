import { useEffect, useState } from "react";
import Banner from "../../components/Events/Banner";
import Card from "../../components/Events/Card";
import Searchbar from "../../components/Searchbar";
import { selectEvent } from "../../redux/forum/eventSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { filterEvents, retrieveAllEvents } from "../../api/eventThunk";
import Categories from "../../components/Events/Categories";
import { retrieveAllCategories } from "../../api/categoriesThunk";
import { selectCategories } from "../../redux/forum/categoriesSlice";
import EmptyComponent from "../../components/EmptyComponent";
export interface EventType {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  user_id: string;
  image: string;
  profile_picture: string;
  music: string;
  cost: string;
  email: string;
}

const Events = () => {
  const dispatch = useAppDispatch();
  const { currentEvents } = useAppSelector(selectEvent);
  const { categories } = useAppSelector(selectCategories);
  const [events, setEvents] = useState<EventType[]>();

  useEffect(() => {
    dispatch(retrieveAllCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(retrieveAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (currentEvents) {
      setEvents(currentEvents);
    }
  }, [currentEvents]);

  const handleCategoryClick = (id: number, category: string) => {
    console.log("Category ID:", id);
    console.log("Category Name:", category);
    dispatch(filterEvents({ keyword: category }))
      .then((response: any) => {
        const filteredEvents = response.payload.getEventByCategory;
        setEvents(filteredEvents);
        console.log(filteredEvents);
      })
      .catch((error: any) => {
        console.error("Error filtering events:", error);
      });
  };

  return (
    <div className="flex flex-col pl-[70px] md:pl-[100px] pt-32">
      <div className="flex justify-center gap-4 flex-wrap">
        {categories &&
          categories?.map((item) => (
            <Categories
              key={item?.id}
              id={item?.id}
              category={item.category}
              onClick={handleCategoryClick}
            />
          ))}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-4 md:px-24 sm:px-4 px-4">
        {(events && events?.length <=0) ? (
          <>
            {events?.map((event) => (
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
          </>
        ) : (
          <EmptyComponent />
        )}
      </div>
    </div>
  );
};

export default Events;
