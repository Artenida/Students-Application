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
import EmptyComponent from "../../components/Helpful Components/EmptyComponent";
export interface EventType {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  user_id: string;
  image: string;
  profile_picture: string;
  music: string;
  price?: string;
  email: string;
}

const Events = () => {
  const dispatch = useAppDispatch();
  const { currentEvents } = useAppSelector(selectEvent);
  const { categories } = useAppSelector(selectCategories);
  const [events, setEvents] = useState<EventType[]>();
  const [keyword, setKeyword] = useState("New");

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

  useEffect(() => {
    dispatch(filterEvents({ keyword: keyword }));
  }, [dispatch, keyword]);

  const filter = (searchValue: string) => {
    setKeyword(searchValue);
     
    if (!currentEvents) return;
  
    const filteredPosts = currentEvents.filter((event) => {
      const costString = event.price ? event.price.toString().toLowerCase() : "";
      const musicString = event.music ? event.music.toLowerCase() : "";

      return (
        costString.includes(searchValue.toLowerCase()) ||
        event.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        event.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        musicString.toLowerCase().includes(searchValue.toLowerCase()) ||
        event?.location.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  
    setEvents(filteredPosts);
  };
  

  const handleCategoryClick = (id: number, category: string) => {
    dispatch(filterEvents({ keyword: category }))
      .then((response: any) => {
        const filteredEvents = response.payload.getEventByCategory;
        setEvents(filteredEvents);
      })
      .catch((error: any) => {
        console.error("Error filtering events:", error);
      });
  };

  return (
    <div className="flex flex-col pl-[70px] md:pl-[100px]">
      <div className="mr-16">
        <Searchbar onChange={filter} />
      </div>
      <div className="flex justify-center gap-4 flex-wrap mt-4">
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
      
      {events && events?.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-4 md:px-24 sm:px-4 px-4">
          {events?.map((event) => (
            <Card
              key={event?.id}
              id={event?.id}
              title={event?.title}
              description={event?.description}
              date={event?.date}
              time={event?.time}
              location={event?.location}
              user_id={event?.user_id}
              profile_picture={event?.profile_picture}
              music={event?.music}
              cost={event?.price}
              email={event?.email}
              image={event?.image}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyComponent />
        </div>
      )}
    </div>
  );
};

export default Events;
