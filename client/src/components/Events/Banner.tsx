import banner1 from "../../assets/event1.jpg";

const Banner = ({ image }: { image: string }) => {
  const imagePath = image ? image.replace(/\\/g, "/") : "";

  return (
    <div className="w-full pl-12">
      {image ? (
        <img
          src={`http://localhost:5000/${imagePath}`}
          alt="post profile"
          className="rounded-3xl h-[400px] w-full object-cover"
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
    </div>
  );
};

export default Banner;
