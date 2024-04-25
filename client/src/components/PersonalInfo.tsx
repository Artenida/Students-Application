import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import { MediumButton } from "./ButtonComponent";
import FormInputsComponent from "./FormInputsComponent";
import { validateUpdateForm } from "../utils/validateUser";
import { updateUser } from "../api/userThunk";

interface FormData {
  username: string;
  email: string;
  subject: string;
  bio: string;
}

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const { currentUser, updateError, token, isLoggedIn } = useAppSelector(selectUser);
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    username: "",
    email: "",
    subject: "",
    bio: "",
  });

  const [data, setData] = useState({
    username: currentUser?.user?.username ?? "",
    email: currentUser?.user?.email ?? "",
    bio: currentUser?.user?.bio ?? "",
    subject: currentUser?.user?.subject ?? "",
    password: "",
    profile_picture: "",
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
        password: data.password,
        subject: data.subject,
        bio: data.bio,
        profile_picture: currentUser?.user?.profile_picture,
        id: currentUser?.user?.id,
      };
      dispatch(updateUser({ body: newUser, token: token }));
    }
  }, [hasErrors, data, currentUser, dispatch]);

  return (
    <div>
      <h2 className="mt-4 font-bold text-[20px] text-custom-color3">Personal Info</h2>
      <div className="mt-8">
        <FormInputsComponent
          id="username"
          placeholder="Your username"
          type="text"
          label="Username"
          value={data.username}
          onChange={handleInputChange}
          errorMessage={formDataErrors.username}
        />
        {isLoggedIn ?
         (<FormInputsComponent
          id="email"
          placeholder="Your email"
          type="email"
          label="Email address"
          value={data.email}
          onChange={handleInputChange}
          errorMessage={formDataErrors.email}
        />) : 
        " "
        }
        
        <FormInputsComponent
          id="bio"
          placeholder="Your bio"
          type="text"
          label="Your bio"
          value={data.bio}
          onChange={handleInputChange}
          errorMessage={formDataErrors.bio}
        />
      </div>
      <MediumButton children={"Save"} onClick={handleUpdate}/>
    </div>
  );
};

export default PersonalInfo;
