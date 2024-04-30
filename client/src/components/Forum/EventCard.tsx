import React from "react";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md md:max-w-lg lg:max-w-xl border border-custom-color2 rounded-lg p-4 mt-4">
      <div className="w-full sm:w-auto">
        {image ? (
          <img
            src={`http://localhost:5000/${image?.replace(/\\/g, "/")}`}
            alt="eventPicture"
            className="w-full object-cover object-center h-40 sm:h-auto rounded-lg"
          />
        ) : (
          <img
            src={backupImage}
            alt=""
            className="w-full object-cover object-center h-40 sm:h-auto rounded-lg"
          />
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-custom-color3 font-semibold">
            {formattedDateTime}
          </h2>
          <div className="flex items-center gap-2 text-custom-color3">
            <IoLocation />
            <h2>{location}</h2>
          </div>
          <h1 className="font-bold text-lg mt-1">{title}</h1>
          <p className="overflow-hidden line-clamp-3">{description}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <IoMusicalNotes />
          <p className="overflow-hidden line-clamp-2">{details}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
