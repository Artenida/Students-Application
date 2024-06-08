import { Link, useNavigate } from "react-router-dom";
import { MediumButton } from "../../components/Helpful Components/ButtonComponent";
import home from "../../assets/home.png";
import FormInputsComponent from "../../components/Helpful Components/FormInputsComponent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../api/userThunk";
import { selectUser } from "../../redux/user/userSlice";
import { validateLoginForm } from "../../utils/validateUser";
import { Alert } from "@mui/material";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, loading, loginError } = useAppSelector(selectUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formDataErrors, setFormDataErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const updatedErrors = validateLoginForm(id, value, formDataErrors);
    setFormData({ ...formData, [id]: value.trim() });
    setFormDataErrors(updatedErrors);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/forum");
    }
  }, [isLoggedIn]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const errors = Object.values(formDataErrors).some((error) => error !== "");

    event.preventDefault();
    if (!errors) {
      dispatch(loginUser(formData));
    } else {
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center h-screen p-4 gap-12 md:pr-16">
      <div className="md:w-1/2 pt-24">
        <img
          src={home}
          alt="WELCOME"
          className="rounded-xl"
        />
        <div className="text-center mt-4 text-custom-color3">
          <h2 className="font-bold text-[20px]">Welcome Back!</h2>
          <h6 className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            placeat.
          </h6>
        </div>
      </div>

      <form
        action=""
        className="w-full md:w-2/3 lg:w-1/2 md:mr-0 md:ml-12 p-8 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between flex-col gap-4">
          <h1 className="text-4xl text-custom-color4 font-bold mb-5">Login</h1>
          <FormInputsComponent
            id={"username"}
            type={"text"}
            label={"Username"}
            placeholder="Enter your username"
            value={formData.username}
            errorMessage={formDataErrors.username}
            onChange={handleChange}
          />
          <FormInputsComponent
            id={"password"}
            type={"password"}
            label={"Password"}
            placeholder="Enter password"
            value={formData.password}
            errorMessage={formDataErrors.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <MediumButton children={"Login"} />
        </div>
        <div className="flex flex-col md:flex-row justify-between text-center items-center mt-4">
          <div>
            <Link to={"/forgotPassword"}>
              <h3 className="text-sm text-center pt-2 text-custom-color3 font-semibold">
                Forgot Password?
              </h3>
            </Link>
          </div>
          <div className="text-sm mt-3">
            <Link to={"/register"}>
              Don't have an account?
              <span className="text-custom-color3 font-semibold"> Sign Up</span>
            </Link>
          </div>
        </div>
        {loginError && (
          <Alert severity="error" className="mt-4">
            Error on login.
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Login;