import React, { ChangeEvent, useState } from "react";
import { MediumButton } from "./ButtonComponent";
import FormInputsComponent from "./FormInputsComponent";

const SocialAccounts = () => {
  const [showForm, setShowForm] = useState(false);
  const [socialAccount, setSocialAccount] = useState("");

  const handleAddAccount = () => {
    setShowForm(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSocialAccount(event.target.value);
  };

  const handleFormSubmit = () => {
    console.log("Adding social account:", socialAccount);
  };

  return (
    <div>
      <h3 className="font-bold text-[20px] text-custom-color3">
        Social Media Accounts
      </h3>
      {showForm && (
        <div className="mt-8">
          <FormInputsComponent
            id="second"
            type="text"
            placeholder="Social media account"
            value={socialAccount}
            onChange={handleInputChange}
          />
          <MediumButton onClick={handleFormSubmit}>Add</MediumButton>
        </div>
      )}
      {!showForm && (
        <button
          className="border border-custom-color2 text-custom-color4 py-2 w-full rounded-lg bg-white"
          onClick={handleAddAccount}
        >
          + Add account
        </button>
      )}
    </div>
  );
};

export default SocialAccounts;
