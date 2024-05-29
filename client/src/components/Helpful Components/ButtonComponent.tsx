import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SmallButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="sm:w-auto w-full rounded-lg bg-custom-color4 px-6 py-1 text-lg font-medium text-custom-color1 hover:bg-custom-color1 hover:text-custom-color3 hover:border-2 hover:border-custom-color3 active:bg-custom-color1"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const MediumButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="w-full rounded-xl bg-custom-color4 px-6 py-3 text-xl font-medium text-custom-color1 hover:bg-custom-color1 hover:text-custom-color3 hover:border-2 hover:border-custom-color3 active:bg-custom-color1"
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
};

const LargeButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="rounded-xl bg-custom-color4 px-9 py-3 text-2xl font-medium text-custom-color1 sm:w-auto">
      {children}
    </button>
  );
};

export { SmallButton, MediumButton, LargeButton };
