import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { LargeButton } from "./Helpful Components/ButtonComponent";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col items-center pt-28 rounded-xl">
      <div>
        <img src={image} alt="WELCOME" className="rounded-xl w-auto h-[350px]"/>
      </div>
      <div className="text-center mt-16 text-custom-color3">
        <h2 className="font-bold text-[30px]">{title}</h2>
        <h3 className="mt-2">{description}</h3>
      </div>
      {isLastCard && (
        <div className="mt-6">
          <Link to={"/login"}>
            <LargeButton children={"Get started"} />
          </Link>
        </div>
      )}
      <div className="flex justify-between mt-auto w-full text-custom-color3 font-semibold text-[20px] cursor-pointer pt-12 pb-28 px-72">
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
