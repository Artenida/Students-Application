import React, { ChangeEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import FormInputsComponent from "./FormInputsComponent";

const SocialAccounts = () => {
  const [isShown, setIsShown] = useState<boolean>();
  
  const handleAddAccount = () => {
    setIsShown(true);
  };
  const handleDeleteAccount = () => {
    console.log("Deleting social account:");
  };

  const handleCreateAccount = () => {
    console.log("Account created successfully");
  };

  return (
    <div>
      <h3 className="font-bold text-[20px] text-custom-color3">
        Social Media Accounts
      </h3>
      {isShown ? (
        <div className="flex gap-2 mt-8">
          <div className="w-full">
            <FormInputsComponent
              id="second"
              type="text"
              placeholder="Social media account"
            />
          </div>
          <div className="flex gap-2 mt-4 cursor-pointer font-bold">
            <IoIosSend
              onClick={handleCreateAccount}
              className="text-custom-color4 text-2xl"
            />
            <MdDelete
              onClick={handleDeleteAccount}
              className="text-custom-color4 text-2xl"
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="mt-2">
        <button
          className="border border-custom-color2 text-custom-color4 py-2 w-full rounded-lg bg-white"
          onClick={handleAddAccount}
        >
          + Add account
        </button>
      </div>
    </div>
  );
};

export default SocialAccounts;
