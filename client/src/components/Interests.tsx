import React, { useState, useEffect } from "react";
import { LuDelete } from "react-icons/lu";
import { SmallButton } from "./ButtonComponent";

interface Interest {
  id: number;
  text: string;
}

interface InterestsProps {
  interests: Interest[];
}

const Interests: React.FC<InterestsProps> = ({ interests }) => {
  const [showAddButton, setShowAddButton] = useState(true);
  const [numRows, setNumRows] = useState(0);

  useEffect(() => {
    const numInterests = interests.length;
    const numRows = Math.ceil(numInterests / 4); // Assuming each interest takes max 25% width
    setNumRows(numRows);
    setShowAddButton(numRows < 2); // Show the button if less than 2 rows
  }, [interests]);

  const handleAddInterest = () => {
    if (interests.length < 8) { 
      // Handle adding interest logic here
    } else {
      alert("You can't add more interests.");
    }
  };

  return (
    <div>
      <h3 className="font-bold text-[20px] text-custom-color3">
        Industry/Interests
      </h3>
      <ul className="flex flex-wrap text-center mt-2">
        {interests.map((interest) => (
          <li
            key={interest.id}
            className="flex mx-1 my-2 p-1 border-custom-color3 bg-custom-color2 rounded-lg max-w-[calc(100%/4)]"
          >
            <span className="flex items-center">{interest.text}</span>
            <LuDelete className="ml-2" />
          </li>
        ))}
      </ul>
      {showAddButton && numRows === 1 && (
        <SmallButton children={"+ Add More"} onClick={handleAddInterest} />
      )}
    </div>
  );
};

export default Interests;
