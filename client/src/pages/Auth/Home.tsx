import HomeCardComponent from "../../components/HomeCardComponent";
import home from "../../assets/home.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn } = useAppSelector(selectUser);
  const navigate = useNavigate();

  const cards = [
    {
      image: home,
      title: "Welcome to EduConnect",
      description:
        "Get ready to explore a world of opportunities tailored just for you!",
    },
    {
      image: home,
      title: "Collaborate and Conquer Together",
      description:
        "Join group discussions, share insights, and learn from each other's experiences to achieve mutual success.",
    },
    {
      image: home,
      title: "Your Ultimate Resource Hub",
      description:
        "Ready to take your academic journey to the next level? Let's dive in!",
    },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };
  const isLastCard = currentCardIndex === cards.length - 1;

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/forum');
    }
  })

  return (
    <div className="flex justify-center items-center h-screen">
      <HomeCardComponent
        image={cards[currentCardIndex]?.image}
        title={cards[currentCardIndex]?.title}
        description={cards[currentCardIndex]?.description}
        onNext={handleNext}
        onPrevious={handlePrevious}
        showNext={currentCardIndex < cards.length - 1}
        showPrevious={currentCardIndex > 0}
        isLastCard={isLastCard}
      />
    </div>
  );
};

export default Home;