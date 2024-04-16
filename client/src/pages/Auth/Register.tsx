import { Link, useNavigate } from "react-router-dom";
import FormInputsComponent from "../../components/FormInputsComponent";
import { MediumButton } from "../../components/ButtonComponent";
import home from "../../assets/home.png";
import { registerUser } from "../../api/userThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/user/userSlice";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formDataErrors, setFormDataErrors] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isLoggedIn, loading, registerError } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/forum");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let updatedErrors = { ...formDataErrors };

    const updatedFormData = { ...formData, [id]: value.trim() };

    if (id === "confirmPassword") {
      if (value !== formData.password) {
        updatedErrors = {
          ...updatedErrors,
          confirmPassword: "Passwords do not match",
        };
      } else {
        updatedErrors = { ...updatedErrors, confirmPassword: "" };
      }
    }

    setFormData(updatedFormData);
    setFormDataErrors(updatedErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    const hasErrors = Object.values(formDataErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      setMessage(false);
      const resultAction = await dispatch(
        registerUser({ username, email, password, confirmPassword })
      );
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/signIn");
      } else if (registerUser.rejected.match(resultAction)) {
        console.error(resultAction.error.message);
      }
    } else {
      setMessage(true);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        action=""
        className="bg-custom-color1 w-full max-w-md p-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <img src={home} alt="WELCOME" className="mx-auto rounded-xl" />
        <div className="text-center pt-4 text-custom-color3">
          <h2 className="font-bold text-[20px]">Welcome Onboard</h2>
          <h6 className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            placeat.
          </h6>
        </div>
        <div className="flex justify-between flex-col mt-7">
          <FormInputsComponent
            id={"username"}
            label={"Username"}
            placeholder="Enter your username"
            onChange={handleChange}
            errorMessage={formDataErrors.username}
          />
          <FormInputsComponent
            id={"email"}
            label={"Email"}
            placeholder="Enter your email"
            type="text"
            onChange={handleChange}
            errorMessage={formDataErrors.email}
          />
          <FormInputsComponent
            id={"password"}
            label={"Password"}
            type={"password"}
            placeholder="Enter password"
            onChange={handleChange}
            errorMessage={formDataErrors.password}
          />
          <FormInputsComponent
            id={"confirmPassword"}
            label={"Password"}
            type={"password"}
            placeholder="Confirm password"
            onChange={handleChange}
            errorMessage={formDataErrors.confirmPassword}
          />
        </div>
        <div className="mt-5">
          <MediumButton children={"Register"} />
        </div>
        <div className="text-custom-color3 mt-3 text-center">
          <Link to={"/login"}>
            Already have an account?{" "}
            <span className="text-custom-color3 font-semibold">Sign In</span>
          </Link>
        </div>
        {registerError && (
          <div className="mt-3 bg-red-200 py-2 px-6 text-red-500">
            {JSON.stringify(registerError)}
          </div>
        )}
        {message && (
          <div className="mt-3 bg-red-200 py-2 px-6 text-red-500">
            "Fix errors before register!"
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
