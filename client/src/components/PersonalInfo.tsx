import { MediumButton } from "./ButtonComponent";
import FormInputsComponent from "./FormInputsComponent";

const PersonalInfo = () => {
  return (
    <div>
      <h2 className="font-bold text-[20px] text-custom-color3">Personal Info</h2>
      <div className="mt-8">
        <FormInputsComponent
          id="username"
          placeholder="Your username"
          type="text"
          label="Username"
        />
        <FormInputsComponent
          id="email"
          placeholder="Your email"
          type="email"
          label="Email address"
        />
        <FormInputsComponent
          id="role"
          placeholder="Role"
          type="text"
          label="Role"
        />
      </div>
      <MediumButton children={"Save"}/>
    </div>
  );
};

export default PersonalInfo;
