import { MediumButton } from "../../components/Helpful Components/ButtonComponent";
import FormInputsComponent from "../../components/Helpful Components/FormInputsComponent";
import { FaLock } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { selectUser } from "../../redux/user/userSlice";
import { changePassword } from "../../api/userThunk";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const { isUpdated, loading, updateError } = useAppSelector(selectUser);
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(selectUser);

  const [formData, setFormData] = useState({
    id: currentUser?.user?.id,
    oldPassword: "",
    newPassword: "",
  });

  const [formDataErrors, setFormDataErrors] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    // const updatedErrors = validateLoginForm(id, value, formDataErrors);
    setFormData({ ...formData, [id]: value });
    // setFormDataErrors(updatedErrors);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const errors = Object.values(formDataErrors).some((error) => error !== "");

    event.preventDefault();
      dispatch(changePassword(formData));
      if(!updateError) {
        alert("Updated succesfully");
        navigate("/editAccount");
      }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="h-[480px] w-[600px] rounded-xl p-4 border border-custom-color2 relative">
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

        <form
          action=""
          className="flex justify-between flex-col gap-5 mt-8"
          onSubmit={handleSubmit}
        >
          <FormInputsComponent
            id="oldPassword"
            placeholder="Current password"
            type="password"
            label="Current password"
            onChange={handleChange}
          />
          <FormInputsComponent
            id="newPassword"
            placeholder="New password"
            type="password"
            label="New password"
            onChange={handleChange}
          />
          {/* <FormInputsComponent
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            label="Confirm Password"
          /> */}
          <MediumButton children={"Save"} />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
