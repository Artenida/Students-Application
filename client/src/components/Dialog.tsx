import React from "react";

interface DialogProps {
  message: string;
  isOpen?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const Dialog: React.FC<DialogProps> = ({
  message,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-70 absolute top-0 left-0 w-full h-full z-50"></div>
      <div className="bg-white p-8 rounded-lg text-center relative z-50">
        <h3 className="text-xl mb-4">{message}</h3>
        <div className="flex justify-center space-x-8">
          <button
            className="bg-custom-color1 text-custom-color4 font-semibold rounded-lg hover:bg-blue-900 hover:text-custom-color1 hover:font-semibold focus:outline-none focus:bg-red-700 transition duration-300 px-6 py-3 cursor-pointer"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-custom-color2 text-custom-color4 font-semibold rounded-lg hover:bg-blue-900 hover:text-custom-color1 focus:outline-none focus:bg-blue-700 transition duration-300 px-6 py-3 cursor-pointer"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
