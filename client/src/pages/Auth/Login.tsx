import { Link } from "react-router-dom";
import { MediumButton } from "../../components/ButtonComponent";
import home from "../../assets/home.png";
import FormInputsComponent from "../../components/FormInputsComponent";
import { useState } from "react";
import {useLoginForm} from "../../hooks/useLoginForm"

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formDataErrors, setFormDataErrors] = useState({
    username: "",
    password: ""
  });
  const { hasErrors, errors, validateForm, displayErrors } = useLoginForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    validateForm(formData);
    displayErrors(formData);
    setFormData({...formData, [id]: value.trim()});
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    // try {
    //   await dispatch(loginUser(formData));
    // } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form className="bg-custom-color1 w-full max-w-md p-4 rounded-xl" onSubmit={handleSubmit}>
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
            label={"Username"}
            placeholder="Enter your username"
            value={formData.username}
            errorMessage={formDataErrors.username}
          />
          <FormInputsComponent
            id={"password"}
            label={"Password"}
            placeholder="Enter password"
            value={formData.password}
            errorMessage={formDataErrors.password}
          />
          <Link to={"/forgotPassword"}>
            <h3 className="text-center text-custom-color2 font-semibold">
              Forgot Password?
            </h3>
          </Link>
        </div>
        <div className="mt-5">
          <Link to={"/forum"}>
            <MediumButton children={"Login"} />
          </Link>
        </div>
        <div className="text-center text-custom-color3 mt-3">
          <Link to={"/register"}>
            Don't have an account?{" "}
            <span className="text-custom-color3 font-semibold">Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
