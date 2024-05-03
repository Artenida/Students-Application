import React from "react";
import moment from "moment";
import backupImage from "../../assets/home.png";
import { IoLocation } from "react-icons/io5";

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
    <div className="bg-white shadow-md rounded-lg py-2 mt-2 flex">
      <div className="flex flex-row px-4 gap-4">
        <div className="w-full sm:w-24">
          {image ? (
            <img
              src={`http://localhost:5000/${image?.replace(/\\/g, "/")}`}
              alt="eventPicture"
              className="w-full object-cover object-center h-24 sm:h-22 rounded-lg"
            />
          ) : (
            <img
              src={backupImage}
              alt=""
              className="w-full object-cover object-center h-24 sm:h-22 rounded-lg"
            />
          )}
        </div>
        <div className="flex flex-col flex-grow">
          <div>
            <h2 className="text-custom-color3 font-semibold">
              {formattedDateTime}
            </h2>
            <div className="flex items-center gap-2 text-custom-color3">
              <IoLocation />
              <h2>{location}</h2>
            </div>
            <h1 className="font-bold text-lg mt-1">{title}</h1>
            <span className="flex justify-end">View more...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
