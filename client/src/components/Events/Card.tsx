import { Link } from "react-router-dom";
import card from "../../assets/cover2.webp";
import { IoLocation } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";

const Card = () => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-12 gap-12">
      <div className="h-full w-full sm:max-w-xl md:max-w-[400px] lg:max-w-3xl xl:max-w-4xl mx-auto">
        <div className="relative">
          <img
            src={card}
            alt="alternative"
            className="w-full rounded-xl h-[400px]"
          />
          <div className="absolute top-2 right-2 bg-white rounded-lg p-2 shadow-md border border-custom-color4">
            <span className="text-custom-color3 text-xs md:text-sm lg:text-base font-bold p-2">
              29
            </span>
          </div>
          <div className="absolute left-0 right-0 bottom-2 flex flex-col justify-end">
            <div className="bg-white rounded-lg p-4 border border-custom-color4 mx-2">
              <div className="flex items-center gap-2 text-custom-color3">
                <FaCalendar />
                <h2>formattedDateTime</h2>
              </div>
              <div className="flex items-center gap-2 text-custom-color3">
                <IoLocation />
                <h2>location</h2>
              </div>
              <h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-2 hover:text-custom-color3">
                Display the title of the event
              </h2>
              <p className="text-sm md:text-base lg:text-lg mb-4">
                Short description of the event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
