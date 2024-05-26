import { MediumButton } from "../../components/ButtonComponent";
import FormInputsComponent from "../../components/FormInputsComponent";
import { FaLock } from "react-icons/fa";

const ChangePassword = () => {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="h-[600px] w-[600px] rounded-xl p-4 border border-custom-color2 relative">
        <div className="absolute p-4">
          <div className="bg-custom-color1 rounded-full p-3 text-custom-color4">
            <FaLock size={24} />
          </div>
        </div>

        <div className="mt-[76px]">
          <h2 className="mt-4 font-bold text-[20px] text-custom-color3">
            Change Password
          </h2>
          <h6 className="text-custom-color3 mt-1">
            To change your password, please fill in the fields below. Your
            password must contain at least 8 characters.
          </h6>
        </div>

        <div className="flex justify-between flex-col gap-5 mt-8">
          <FormInputsComponent
            id="currentPassword"
            placeholder="Current password"
            type="password"
            label="Current password"
          />
          <FormInputsComponent
            id="newPassword"
            placeholder="New password"
            type="password"
            label="New password"
          />
          <FormInputsComponent
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
          />
          <MediumButton children={"Save"} />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
