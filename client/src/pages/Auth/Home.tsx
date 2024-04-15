import HomeCardComponent from "../../components/HomeCardComponent";
import home from "../../assets/home.png";
import { useState } from "react";

const Home = () => {
  const cards = [
    {
      image: home,
      title: "WELCOME TO EduConnect",
      description:
        "Get ready to explore a world of opportunities tailored just for you!",
    },
    {
      image: home,
      title: "SECURITY PAGE",
      description: "At EduConnect, we prioritize your privacy and security.",
    },
    {
      image: home,
      title: "COLLABORATE AND CONQUER TOGETHER",
      description:
        "Join group discussions, share insights, and learn from each other's experiences to achieve mutual success.",
    },
    {
      image: home,
      title: "YOUR ULTIMATE RESOURCE HUB",
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
