import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { LargeButton } from "./ButtonComponent";

interface HomeCard {
  image: string;
  title: string;
  description: string;
  onNext: () => void;
  onPrevious: () => void;
  showNext: boolean;
  showPrevious: boolean;
  isLastCard: boolean;
}

const HomeCardComponent: React.FC<HomeCard> = ({
  image,
  title,
  description,
  onNext,
  onPrevious,
  showNext,
  showPrevious,
  isLastCard,
}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-custom-color1 h-[630px] w-[400px] rounded-xl">
      <div>
        <img src={image} alt="WELCOME" className="rounded-xl" />
      </div>
      <div className="flex justify-center flex-col items-center mt-16 text-custom-color3 text-[20px]">
        <h2 className="font-bold">{title}</h2>
        <h3 className="mt-2">{description}</h3>
      </div>
      {isLastCard && (<div className="mt-8">
        <LargeButton children={"Get started"} />
      </div>)}
      <div className="flex justify-between mt-auto w-full text-custom-color3 font-semibold text-[20px] cursor-pointer">
        <div className="flex items-center">
          {showPrevious && (
            <div className="flex items-center mr-auto" onClick={onPrevious}>
              <GrFormPreviousLink className="font-semibold" />
              Prev
            </div>
          )}
        </div>
        <div className="flex items-center">
          {showNext && (
            <div className="flex items-center ml-auto" onClick={onNext}>
              Next
              <GrFormNextLink className="font-semibold" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCardComponent;
