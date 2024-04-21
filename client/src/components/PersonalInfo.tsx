import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import { MediumButton } from "./ButtonComponent";
import FormInputsComponent from "./FormInputsComponent";
import { validateUpdateForm } from "../utils/validateUser";
import { updateUser } from "../api/userThunk";

interface User {
  id: string;
  username: string | undefined;
  email: string | undefined;
  subject: string | undefined;
}

interface UserState {
  user: User;
}
interface FormData {
  username: string;
  email: string;
  subject: string,
}
const PersonalInfo: React.FC<UserState> = ({user}) => {
  const dispatch = useAppDispatch();
  const { updateError, token } = useAppSelector(selectUser);
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    username: "",
    email: "",
    subject: "",
  });

  const [data, setData] = useState({
    username: user?.username ?? "",
    email: user?.email ?? "",
    subject: user?.subject ?? "",
  });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
      const updatedErrors = validateUpdateForm(id, value, formDataErrors);
      setFormDataErrors(updatedErrors);
    },
    [formDataErrors]
  );

  const hasErrors = Object.values(formDataErrors).some((error) => error !== "");
  const handleUpdate = useCallback(() => {
    if (hasErrors) {
      setMessage(true);
      setSuccess(false);
    } else {
      setMessage(false);
      setSuccess(true);
      const newUser = {
        username: data.username,
        email: data.email,
        subject: data.subject,
        id: user?.id,
      };
      dispatch(updateUser({ body: newUser, token: token }));
    }
  }, [hasErrors, data, user, dispatch]);


  return (
    <div>
      <h2 className="mt-4 font-bold text-[20px] text-custom-color3">Personal Info</h2>
      <div className="mt-8">
        <FormInputsComponent
          id="username"
          placeholder="Your username"
          type="text"
          label="Username"
          value={user.username}
          onChange={handleInputChange}
          errorMessage={formDataErrors.username}
        />
        <FormInputsComponent
          id="email"
          placeholder="Your email"
          type="email"
          label="Email address"
          value={user.email}
          onChange={handleInputChange}
          errorMessage={formDataErrors.email}
        />
        <FormInputsComponent
          id="uni"
          placeholder="University / Job"
          type="text"
          label="University / Job"
          value={user.subject}
          onChange={handleInputChange}
          errorMessage={formDataErrors.subject}
        />
      </div>
      <MediumButton children={"Save"} onClick={handleUpdate}/>
      {updateError && (
        <div className="mt-3 bg-red-200 py-2 px-6 text-red-500">
          {JSON.stringify(updateError)}
        </div>
      )}

      {message && (
        <div className="mt-3 bg-red-200 py-2 px-6 text-red-500">
          Form has errors. Please fix them before updating.
        </div>
      )}
      {success && (
        <div className="bg-green-200 py-2 px-6 text-green-500 mt-12">
          User is updated successfully!
        </div>
      )}

    </div>
  );
};

export default PersonalInfo;
