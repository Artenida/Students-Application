import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SmallButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="block w-full rounded bg-custom-color3 px-7 py-2 text-lg font-medium text-custom-color1 hover:bg-custom-color1 hover:text-custom-color3 hover:border-2 hover:border-custom-color3 active:bg-custom-color1 sm:w-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const MediumButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="block w-full rounded bg-custom-color3 px-6 py-3 text-xl font-medium text-custom-color1 hover:bg-custom-color1 hover:text-custom-color3 hover:border-2 hover:border-custom-color3 active:bg-custom-color1 sm:w-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const LargeButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="block w-full rounded-xl bg-custom-color3 px-9 py-3 text-2xl font-medium text-custom-color1 sm:w-auto">
      {children}
    </button>
  );
};

export { SmallButton, MediumButton, LargeButton };
