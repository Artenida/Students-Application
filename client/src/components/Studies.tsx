import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import { SmallButton } from "./ButtonComponent";
import FormInputsComponent from "./FormInputsComponent";
import { validateUpdateForm } from "../utils/validateUser";
import { updateUser } from "../api/userThunk";

interface FormData {
  username: string;
  email: string;
  subject: string;
  bio: string;
}
const Studies = () => {
  const dispatch = useAppDispatch();
  const { currentUser, updateError, token } = useAppSelector(selectUser);
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
        username: currentUser?.user?.username,
        email: currentUser?.user?.email,
        password: currentUser?.user?.password,
        subject: data.subject,
        bio: currentUser?.user?.bio,
        profile_picture: currentUser?.user?.profile_picture,
        id: currentUser?.user?.id,
      };
      dispatch(updateUser({ body: newUser, token: token }));
    }
  }, [hasErrors, data, currentUser, dispatch]);

  return (
    <div>
      <h3 className="font-bold text-[20px] text-custom-color3">
        University / Profile
      </h3>
      <div className="mt-2">
        <FormInputsComponent
          id="subject"
          value={data.subject}
          onChange={handleInputChange}
          errorMessage={formDataErrors.subject}
        />
      </div>

      <SmallButton children={"Save"} onClick={handleUpdate}/>
    </div>
  );
};

export default Studies;
