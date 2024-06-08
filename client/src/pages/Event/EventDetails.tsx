import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectEvent } from "../../redux/forum/eventSlice";
import { useEffect, useState } from "react";
import Loading from "../../components/Helpful Components/Loading";
import { deleteEvent, getSingleEvent } from "../../api/eventThunk";
import moment from "moment";
import Banner from "../../components/Events/Banner";
import { IoLocation } from "react-icons/io5";
import { FaCalendar, FaDeleteLeft } from "react-icons/fa6";
import { IoMdMusicalNote } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import DOMPurify from "dompurify";
import { selectUser } from "../../redux/user/userSlice";
import { Dialog } from "../../components/Helpful Components/Dialog";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

const EventDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(selectUser);
  const userID = currentUser?.user?.id;
  const { eventDetails, retrieveError, loading } = useAppSelector(selectEvent);
  const { id } = useParams();
  const [selectedEventId, setSelectedEventId] = useState<string>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const eventId = String(id);
  const user_id = eventDetails[0].user_id;
  const formattedDateTime = moment(eventDetails[0]?.date).format(
    "MMMM Do YYYY"
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

  const handleDeleteAccount = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedEventId) {
      dispatch(deleteEvent(selectedEventId)).then(() => {
        setIsDeleteDialogOpen(false);
        navigate('/events')
      });
    }
  };

  const handleEditClick = (eventId: string) => {
    navigate(`/updateevent/${eventId}`);
  };

  return (
    <div>
      <div className="pt-32 flex justify-center flex-col px-8 md:px-24 lg:px-32 xl:px-32 pb-16">
        <div className="w-full flex justify-center">
          <Banner image={eventDetails[0]?.image} />
        </div>
        <div className="mt-4 flex gap-4 justify-end">
            {String(userID) === String(user_id) && (
              <div className="">
                  <div className="text-xl">
                    <div
                      className="cursor-pointer p-4 hover:bg-gray-100 hover:rounded-full"
                      onClick={() => handleEditClick(eventId)}
                    >
                      <FaEdit />
                    </div>
                    <div
                      className="cursor-pointer p-4 hover:bg-gray-100 hover:rounded-full"
                      onClick={() => handleDeleteAccount(eventId)}
                    >
                      <FaTrash />
                    </div>
                  </div>
              </div>
            )}
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
                <h2>{eventDetails[0]?.time}</h2>
              </div>
              <div className="flex items-center gap-3 text-base md:text-xl">
                <IoLocation className="text-custom-color3" />
                <h2>{eventDetails[0]?.location}</h2>
              </div>
              <div className="flex items-center gap-3 text-base md:text-xl">
                <MdAlternateEmail className="text-custom-color3" />
                <h2>
                   Contact for more:{"   "}  
                  <a 
                    href={`mailto:${eventDetails[0]?.email}`}
                    className="text-custom-color3 cursor-pointer"
                  >
                    {eventDetails[0]?.email}
                  </a>
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
      <Dialog
        isOpen={isDeleteDialogOpen}
        message="Are you sure you want to delete this event?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EventDetails;
