import banner from "../../assets/banner.jpg"
import banner1 from "../../assets/banner.jpg"
import banner2 from "../../assets/banner.jpg"
import banner3 from "../../assets/banner.jpg"

const Banner = ({image} : {image:string}) => {
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
            <img
              src={banner}
              alt="Profile"
              className="rounded-3xl h-[400px] w-full object-cover"
            />
          )}
        </div>
    )
}

export default Banner