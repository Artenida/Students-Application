import React, { ChangeEvent, useState } from "react";
import { MediumButton } from "./ButtonComponent";
import FormInputsComponent from "./FormInputsComponent";

const SocialAccounts = () => {
  const handleFormSubmit = () => {
    console.log("Adding social account:");
  };

  return (
    <div>
      <h3 className="font-bold text-[20px] text-custom-color3">
        Social Media Accounts
      </h3>
        <div className="mt-8">
          <FormInputsComponent
            id="second"
            type="text"
            placeholder="Social media account"
          />
          <MediumButton onClick={handleFormSubmit}>Add</MediumButton>
        </div>
        <button
          className="border border-custom-color2 text-custom-color4 py-2 w-full rounded-lg bg-white"
        >
          + Add account
        </button>
    </div>
  );
};

export default SocialAccounts;
