import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectEvent } from "../../redux/forum/eventSlice";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { getSingleEvent } from "../../api/eventThunk";
import moment from "moment";
import Banner from "../../components/Events/Banner";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";
import { IoMdMusicalNote } from "react-icons/io";
import { RiH2 } from "react-icons/ri";

const EventDetails = () => {
  const dispatch = useAppDispatch();
  const { eventDetails, retrieveError, loading } = useAppSelector(selectEvent);
  const { id } = useParams();
  const formattedDateTime = moment(eventDetails[0]?.createdAt).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  useEffect(() => {
    dispatch(getSingleEvent(id ?? "")).then(() => {
      console.log(eventDetails);
    });
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  //   if (retrieveError) {
  //     return (
  //       <Error
  //         message1={"404"}
  //         message2={"Oooops"!}
  //         message3={"Page Not Found"}
  //         message4={"This page doesn't exist or was removed"}
  //         message5={"We suggest you go back to home!"}
  //       />
  //     );
  //   }

  return (
    <div>
      <div className="pt-32 flex justify-center flex-col pl-12 pb-16">
        <div className="xs:px-8 sm:px-16 px-32 w-full flex justify-center">
          <Banner image={eventDetails[0]?.image} />
        </div>
        <article className="flex justify-between gap-12 xs:px-24 sm:px-32 px-48 mt-12">
          <div className="">
            <h1 className="text-5xl font-roboto">
              {eventDetails && eventDetails[0]?.title}
            </h1>
            <div className="mt-4 text-2xl">
              <p>{eventDetails && eventDetails[0]?.description}</p>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-lg">
                <IoMdMusicalNote className="text-custom-color3" />
                <h2>{eventDetails[0]?.music}</h2>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <FaCalendar className="text-custom-color3" />
                <h2>{formattedDateTime}</h2>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <IoLocation className="text-custom-color3" />
                <h2>{eventDetails[0]?.location}</h2>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold">Categories</h2>
            {eventDetails && eventDetails[0]?.categories.length > 0 ? (
              <div className="mt-4">
                {eventDetails[0]?.categories.map((category: any) => (
                  <h3
                    className="bg-gray-200 shadow-sm p-2 rounded-full text-center mb-4"
                    key={category?.id}
                  >
                    #{category?.name}
                  </h3>
                ))}
              </div>
            ) : (
              <h2 className="text-gray-500">No categories available</h2>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default EventDetails;
