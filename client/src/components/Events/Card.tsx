import { Link } from "react-router-dom";
import card from "../../assets/cover2.webp";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";
import moment from "moment";
import { IoMdMusicalNote } from "react-icons/io";
import user from "../../assets/userProfile.jpg";
import { useState } from "react";
import banner1 from "../../assets/event1.jpg";
import DOMPurify from "dompurify";

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
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
          <Link to={`/events/${id}`}>
            <div className="cursor-pointer absolute left-0 right-0 bottom-2 flex flex-col justify-end">
              <div className="bg-white rounded-lg p-4 border border-custom-color4 mx-2">
                <div className="flex items-center gap-2 text-custom-color3">
                  <FaCalendar />
                  <h2>{formattedDateTime}</h2>
                  <h2>{time}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <IoLocation />
                  <h2>{location}</h2>
                </div>
                {music ? (
                  <div className="flex items-center gap-2">
                    <IoMdMusicalNote />
                    <h2>{music}</h2>
                  </div>
                ) : null}
                <div className="flex justify-between items-center text-center">
                  <h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-2">
                    {title}
                  </h2>
                  {cost ? (
                    <h1 className="text-custom-color3 font-semibold text-2xl mb-2 bg-gray-100 shadow-sm py-1 px-3 rounded-md">
                      ${cost}
                    </h1>
                  ) : null}
                </div>
                <p
                  className="text-sm md:text-base lg:text-lg"
                  style={clampStyle}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                  />
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
