import { useState } from "react";
import { MdOutlineKeyboardArrowLeft , MdOutlineKeyboardArrowRight  } from "react-icons/md";
import "./ImageSlider.css"

type ImageSliderProps = {
  images: Image[];
};

export interface Image {
  url: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({images}) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  console.log(images, 'images')
  console.log(length, 'length')
  console.log(current, 'current')

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <section className="slider-page">
      <MdOutlineKeyboardArrowLeft  className="left-arrow" onClick={prevSlide} />
      <MdOutlineKeyboardArrowRight  className="right-arrow" onClick={nextSlide} />
      {images?.map((img, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <div className="image-wrapper">
                <img
              src={`http://localhost:5000/${img.url?.replace(
                /\\/g,
                "/"
              )}`}
              alt="blogPicture"
              className="w-full object-cover object-center h-64"
            />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
