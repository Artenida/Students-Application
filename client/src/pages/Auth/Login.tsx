import { Link } from "react-router-dom";
import { LargeButton, MediumButton } from "../../components/ButtonComponent";
import home from "../../assets/home.png";
import FormInputsComponent from "../../components/FormInputsComponent";

const Login = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-custom-color1 w-full max-w-md p-4 rounded-xl">
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
          />
          <FormInputsComponent
            id={"password"}
            label={"Password"}
            placeholder="Enter password"
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
            Don't have an account? <span className="text-custom-color3 font-semibold">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
