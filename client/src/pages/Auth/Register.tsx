import { Link, useNavigate } from "react-router-dom";
import FormInputsComponent from "../../components/Helpful Components/FormInputsComponent";
import { MediumButton } from "../../components/Helpful Components/ButtonComponent";
import home from "../../assets/home.png";
import { registerUser } from "../../api/userThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/user/userSlice";
import {
  validateRegisterForm,
  validateConfirmPassword,
} from "../../utils/validateUser";
import { Alert } from "@mui/material";

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
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/forum");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    let errors = formDataErrors;
    if (id === "confirmPassword") {
      errors = {
        ...errors,
        confirmPassword: validateConfirmPassword(formData.password, value),
      };
    } else {
      errors = validateRegisterForm(id, value, formDataErrors);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value.trim(),
    }));
    setFormDataErrors(errors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    const errors = Object.values(formDataErrors).some((error) => error !== "");

    if (!errors && isClicked) {
      setMessage(false);
      const resultAction = await dispatch(
        registerUser({ username, email, password, confirmPassword })
      );
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/login");
      } else if (registerUser.rejected.match(resultAction)) {
        console.error(resultAction.error.message);
      }
    } else {
      setMessage(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center h-screen p-2 gap-12 md:pr-16">
      <div className="md:w-1/2 md:order-1">
        <img
          src={home}
          alt="WELCOME"
          className="rounded-xl"
          height={300}
        />
        <div className="text-center pt-4 text-custom-color3">
          <h2 className="font-bold text-[20px]">Welcome Onboard</h2>
          <h6 className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            placeat.
          </h6>
        </div>
      </div>

      <form
        action=""
        className="w-full md:w-2/3 lg:w-1/2 md:mr-0 md:ml-12 px-8 rounded-xl md:order-2"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between flex-col mt-7 gap-4">
          <h1 className="text-4xl text-custom-color4 font-bold mb-5">
            Register
          </h1>
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
            label={"Confirm Password"}
            type={"password"}
            placeholder="Confirm password"
            onChange={handleChange}
            errorMessage={formDataErrors.confirmPassword}
          />
        </div>
        <div className="flex gap-1 text-sm mt-4 ml-2">
          <input type="checkbox" onClick={handleClick} />I have read
          <Link to={"/terms"}>
            <h3 className="text-custom-color3">Terms and Conditions</h3>
          </Link>
        </div>
        <div className="mt-5">
          <MediumButton children={"Register"} />
        </div>
        <div className="mt-3 text-center">
          <Link to={"/login"}>
            Already have an account?
            <span className="text-custom-color3 font-semibold"> Sign In</span>
          </Link>
        </div>
        {registerError && (
          <Alert severity="error" className="mt-4">
            Error on register.
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Register;