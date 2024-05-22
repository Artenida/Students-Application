import { Link } from "react-router-dom";
import think from "../../assets/think2-removebg-preview.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-custom-color4 p-4 md:px-12 rounded-md mt-4">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <img src={think} alt="Thinking man" className="w-6 h-6 md:w-10 md:h-10" />
        <h2 className="text-white font-semibold text-center md:text-left text-base md:text-lg">
          Got something on your mind?
        </h2>
      </div>
      <Link to={`/createPost`}>
        <button className="bg-custom-color5 text-white py-2 px-4 rounded-md text-sm md:text-base">
          Ask the community
        </button>
      </Link>
    </div>
  );
};

export default Banner;
