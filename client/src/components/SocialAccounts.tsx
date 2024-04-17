import { MediumButton } from "./ButtonComponent";
import FormInputsComponent from "./FormInputsComponent";

const SocialAccounts = () => {
  return (
    <div>
      <h3 className="font-bold text-[20px] text-custom-color3">
        Social Media Accounts
      </h3>
      <div className="mt-8">
        <FormInputsComponent
          id="first"
          type="text"
          placeholder="Social media account"
        />
        <FormInputsComponent
          id="second"
          type="text"
          placeholder="Social media account"
        />
      </div>
      <MediumButton children={"Save"}/>
    </div>
  );
};

export default SocialAccounts;
