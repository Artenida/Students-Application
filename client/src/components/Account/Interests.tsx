import React, { useState, useEffect } from "react";
import { LuDelete } from "react-icons/lu";
import { SmallButton } from "../Helpful Components/ButtonComponent";

interface Interest {
  id: string;
  text: string;
}

const initialInterests: Interest[] = [
  { id: "1", text: "UI Design" },
  { id: "2", text: "Framer" },
  { id: "3", text: "Startups" },
  { id: "4", text: "UX" },
  { id: "5", text: "UI Design" },
  { id: "6", text: "UXfvdcsscsx" },
  { id: "7", text: "StarUXfvdcsscsxtups" },
  // { id: "8", text: "UXfvdcsscsx" },
];

const Interests = () => {
  const [interests, setInterests] = useState<Interest[]>(initialInterests);

  const handleDeleteInterest = (id: string) => {
    // Make API call to delete interest from database
    // Upon successful deletion, update the state to remove the interest
    const updatedInterests = interests.filter((interest) => interest.id !== id);
    setInterests(updatedInterests);
  };

  const handleAddInterest = () => {
    if (interests.length < 8) {
      const newInterestId = interests.length + 1;
      const newInterest = {
        id: String(newInterestId),
        text: `Interest ${newInterestId}`,
      };
      setInterests([...interests, newInterest]);
    } else {
      alert("You can't add more interests.");
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h3 className="font-bold text-[20px] text-custom-color3">
          Industry/Interests
        </h3>
        <ul className="flex flex-wrap text-center mt-2">
          {interests.map((interest) => (
            <li
              key={interest.id}
              className="flex mx-1 my-1 p-1 border-custom-color3 bg-custom-color2 rounded-lg max-w-[calc(100%/4)]"
              style={{ alignItems: "center" }}
            >
              <span className="flex items-center flex-grow">
                {interest.text}
              </span>
              <LuDelete
                className="ml-2 cursor-pointer"
                onClick={() => handleDeleteInterest(interest.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        {interests.length < 8 && (
          <SmallButton children={"+ Add More"} onClick={handleAddInterest} />
        )}
      </div>
    </div>
  );
};

export default Interests;
