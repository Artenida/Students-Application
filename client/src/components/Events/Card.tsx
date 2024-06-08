import { Link, useNavigate } from "react-router-dom";
import card from "../../assets/cover2.webp";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";
import moment from "moment";
import { IoMdMusicalNote } from "react-icons/io";
import user from "../../assets/userProfile.jpg";
import { useState } from "react";
import banner1 from "../../assets/event1.jpg";
import DOMPurify from "dompurify";
import { BsThreeDots } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectEvent } from "../../redux/forum/eventSlice";
import { selectUser } from "../../redux/user/userSlice";
import { deleteEvent } from "../../api/eventThunk";
import { Dialog } from "../Helpful Components/Dialog";

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
  cost?: string;
  email: string;
}

const Card: React.FC<EventType> = ({
  id,
  title,
  description,
  image,
  date,
  time,
  location,
  music,
  profile_picture,
  email,
  cost,
  user_id,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser } = useAppSelector(selectUser);
  const userID = currentUser?.user?.id;
  const [showOptions, setShowOptions] = useState(false);
  const formattedDateTime = moment(date).format("MMMM Do YYYY");
  const formattedDay = moment(date).format("Do");
  const sanitizedDescription = description
    ? DOMPurify.sanitize(description)
    : "";
  const clampStyle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical" as "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2,
    maxHeight: "3em",
  };
  const [selectedEventId, setSelectedEventId] = useState<string>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteAccount = (postId: string) => {
    setSelectedEventId(postId);
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedEventId) {
      dispatch(deleteEvent(selectedEventId)).then(() => {
        setIsDeleteDialogOpen(false);
        setShowOptions(false);
      });
    }
  };

  const handleEditClick = (eventId: string) => {
    navigate(`/updateevent/${eventId}`);
  };

  return (
    <div>
      <div className="h-full w-full sm:max-w-xl md:max-w-[400px] lg:max-w-3xl xl:max-w-4xl mx-auto">
        <div className="relative">
          {image ? (
            <img
              src={`http://localhost:5000/${image?.replace(/\\/g, "/")}`}
              alt="eventPicture"
              className="object-cover object-center rounded-xl h-[400px]"
            />
          ) : (
            <div className="relative">
              <img
                src={banner1}
                alt="Profile"
                className="rounded-3xl h-[400px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl"></div>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white rounded-lg p-2 shadow-md border border-custom-color4">
            <span className="text-custom-color3 text-xs md:text-sm lg:text-base font-bold p-2">
              {formattedDay}
            </span>
          </div>
          <div className="absolute left-0 right-0 bottom-2 flex flex-col justify-end">
            <div className="bg-white rounded-lg p-4 border border-custom-color4 mx-2">
              <div>
                {String(userID) === String(user_id) && (
                  <div className="relative flex justify-end">
                    <div
                      className="mr-2 cursor-pointer"
                      onClick={toggleOptions}
                    >
                      <BsThreeDots className="text-xl" />
                    </div>
                    {showOptions && (
                      <div className="absolute w-32 right-0 mt-4 bg-white shadow-lg rounded-md py-1">
                        <div
                          className="cursor-pointer px-2 py-2 hover:bg-gray-100"
                          onClick={() => handleEditClick(id)}
                        >
                          Edit Event
                        </div>
                        <div
                          className="cursor-pointer px-2 py-2 hover:bg-gray-100"
                          onClick={() => handleDeleteAccount(id)}
                        >
                          Delete Event
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Link to={`/events/${id}`}>
                <div className="flex items-center gap-2 text-custom-color3 cursor-pointer ">
                  <FaCalendar />
                  <h2>{formattedDateTime}</h2>
                  <h2>{time}</h2>
                </div>
              </Link>
              <Link to={`/events/${id}`}>
                <div className="flex items-center gap-2 cursor-pointer ">
                  <IoLocation />
                  <h2>{location}</h2>
                </div>
              </Link>
              {music ? (
                <Link to={`/events/${id}`}>
                  <div className="flex items-center gap-2 cursor-pointer ">
                    <IoMdMusicalNote />
                    <h2>{music}</h2>
                  </div>
                </Link>
              ) : null}{" "}
              <Link to={`/events/${id}`}>
                <div className="flex justify-between cursor-pointer ">
                  <h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-2">
                    {title}
                  </h2>
                  {cost ? (
                    <h1 className="cursor-pointer text-custom-color3 font-semibold text-2xl mb-2 bg-gray-100 shadow-sm py-1 px-3 rounded-md">
                      ${cost}
                    </h1>
                  ) : null}
                </div>
              </Link>
              <p
                className="cursor-pointer text-sm md:text-base lg:text-lg"
                style={clampStyle}
              >
                <Link to={`/events/${id}`}>
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                  />
                </Link>
              </p>
              <div className="flex justify-end relative">
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative"
                >
                  {profile_picture ? (
                    <img
                      src={`http://localhost:5000/${profile_picture?.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt="eventPicture"
                      className="object-cover object-center rounded-full w-[40px] h-[40px] cursor-pointer"
                    />
                  ) : (
                    <img
                      src={user}
                      alt=""
                      className="object-cover object-center rounded-full w-[40px] h-[40px] cursor-pointer"
                    />
                  )}
                  {isHovered && (
                    <div className="flex gap-2 z-50 absolute top-0 left-10 bg-white rounded-lg p-2 shadow-md border border-custom-color4">
                      <p className="text-sm">{email}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Card;
