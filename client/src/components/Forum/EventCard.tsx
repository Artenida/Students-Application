import React from "react";
import moment from "moment";
import backupImage from "../../assets/home.png";
import { IoLocation } from "react-icons/io5";
import { IoMdMusicalNote } from "react-icons/io";
import { Link } from "react-router-dom";

export interface EventType {
  id: string;
  title: string;
  date: Date;
  location: string;
  user_id: string;
  profile_picture: string;
  music: string;
  cost: string;
}

const EventCard: React.FC<EventType> = ({
  id,
  title,
  date,
  location,
  profile_picture,
  music,
  cost,
}) => {
  const formattedDateTime = moment(date).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <div className="bg-white shadow-md rounded-lg py-2 mt-3">
      <div className="flex flex-row px-4 gap-4">
        <div className="sm:w-24">
          {profile_picture ? (
            <img
              src={`http://localhost:5000/${profile_picture?.replace(
                /\\/g,
                "/"
              )}`}
              alt="eventPicture"
              className="object-cover object-center h-28 sm:h-22 rounded-lg"
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
            <h1 className="font-bold text-lg mt-1">{title}</h1>

            <div className="flex items-center gap-2 text-sm">
              <IoLocation />
              <h2>{location}</h2>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IoMdMusicalNote />
              <h2>{music}</h2>
            </div>
            <div className="flex items-center gap-2 text-md">
              <h2>Entry fee: </h2>
              <h2>${cost}</h2>
            </div>
            <Link to={`/events`}>
              <span className="flex justify-end cursor-pointer hover:text-gray-500">
                Learn more
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
