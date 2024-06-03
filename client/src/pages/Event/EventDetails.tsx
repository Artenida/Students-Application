import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectEvent } from "../../redux/forum/eventSlice";
import { useEffect } from "react";
import Loading from "../../components/Helpful Components/Loading";
import { getSingleEvent } from "../../api/eventThunk";
import moment from "moment";
import Banner from "../../components/Events/Banner";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";
import { IoMdMusicalNote } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import DOMPurify from "dompurify";

const EventDetails = () => {
  const dispatch = useAppDispatch();
  const { eventDetails, retrieveError, loading } = useAppSelector(selectEvent);
  const { id } = useParams();
  const formattedDateTime = moment(eventDetails[0]?.date).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
  const sanitizedDescription = eventDetails[0]?.description
    ? DOMPurify.sanitize(eventDetails[0]?.description)
    : "";

  useEffect(() => {
    dispatch(getSingleEvent(id ?? ""));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="pt-32 flex justify-center flex-col px-8 md:px-24 lg:px-32 xl:px-32 pb-16">
        <div className="w-full flex justify-center">
          <Banner image={eventDetails[0]?.image} />
        </div>
        <article className="flex flex-col md:flex-row justify-between gap-12 mt-12 px-24 md:px-48 lg:px-32 xl:px-32 pb-16">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-roboto">
              {eventDetails && eventDetails[0]?.title}
            </h1>
            <div className="mt-4 text-lg sm:text-xl md:text-2xl">
              <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />{" "}
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-base md:text-xl">
                <IoMdMusicalNote className="text-custom-color3" />
                <h2>{eventDetails[0]?.music}</h2>
              </div>
              <div className="flex items-center gap-3 text-base md:text-xl">
                <FaCalendar className="text-custom-color3" />
                <h2>{formattedDateTime}</h2>
              </div>
              <div className="flex items-center gap-3 text-base md:text-xl">
                <IoLocation className="text-custom-color3" />
                <h2>{eventDetails[0]?.location}</h2>
              </div>
              <div className="flex items-center gap-3 text-base md:text-xl">
                <MdAlternateEmail className="text-custom-color3" />
                <h2>
                  Contact for more:{" "}
                  <span className="text-custom-color3 cursor-pointer">
                    {eventDetails[0]?.email}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-0">
            <h2 className="text-lg sm:text-xl font-bold">Categories</h2>
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
