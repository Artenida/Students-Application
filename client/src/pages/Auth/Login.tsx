import { Link, redirect, useNavigate } from "react-router-dom";
import { MediumButton } from "../../components/ButtonComponent";
import home from "../../assets/home.png";
import FormInputsComponent from "../../components/FormInputsComponent";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../api/userThunk";
import { selectUser } from "../../redux/user/userSlice";
import { validateLoginForm } from "../../utils/validateUser";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, loginError } = useAppSelector(selectUser);
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await dispatch(loginUser(formData));
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form action="" className="bg-custom-color1 w-full max-w-md p-4 rounded-xl" onSubmit={handleSubmit}>
        <img src={home} alt="WELCOME" className="mx-auto rounded-xl" />
        <div className="text-center mt-4 text-custom-color3">
          <h2 className="font-bold text-[20px]">Welcome Back!</h2>
          <h6 className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            placeat.
          </h6>
        </div>
        <div className="flex justify-between flex-col mt-7">
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
          <Link to={"/forgotPassword"}>
            <h3 className="text-center text-custom-color2 font-semibold">
              Forgot Password?
            </h3>
          </Link>
        </div>
        <div className="mt-5">
            <MediumButton children={"Login"}/>
        </div>
        <div className="text-center text-custom-color3 mt-3">
          <Link to={"/register"}>
            Don't have an account?{" "}
            <span className="text-custom-color3 font-semibold">Sign Up</span>
          </Link>
        </div>
        {loginError && (
          <div className="mt-3 bg-red-200 py-2 px-6 text-red-500">
            {JSON.stringify(loginError)}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
