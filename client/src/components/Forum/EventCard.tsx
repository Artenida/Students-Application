import moment from "moment";
import backupImage from "../../assets/home.png";
import { IoLocation } from "react-icons/io5";
import { IoMusicalNotes } from "react-icons/io5";

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  details: string;
  user_id: string;
  image: string;
}

const EventCard: React.FC<EventType> = ({
  title,
  description,
  date,
  location,
  details,
  image,
}) => {
  const formattedDateTime = moment(date).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div className="grid grid-cols-2 gap-4 w-[600px] border border-custom-color2 rounded-lg p-2 mt-4">
      <div className="">
        {image ? (
          <img
            src={`http://localhost:5000/${image?.replace(/\\/g, "/")}`}
            alt="eventPicture"
            className="w-full object-cover object-center h-40 rounded-lg"
          />
        ) : (
          <img
            src={backupImage}
            alt=""
            className="w-full object-cover object-center h-40 rounded-lg"
          />
        )}
      </div>
      <div>
        <h2 className="text-custom-color3 font-semibold">
          {formattedDateTime}
        </h2>
        <div className="flex items-center gap-2 text-custom-color3">
          <IoLocation />
          <h2>{location}</h2>
        </div>
        <h1 className="font-bold text-lg mt-1">{title}</h1>
        <p>
          {description.length > 30
            ? description.substring(0, 60) + "..."
            : description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <IoMusicalNotes />
          <h2>{details.length > 30 ? details.substring(0,40) + "..." : details}</h2>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
