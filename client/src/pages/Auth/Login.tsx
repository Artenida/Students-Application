import { Link } from "react-router-dom";
import { LargeButton } from "../../components/ButtonComponent";
import home from "../../assets/home.png";
import FormInputsComponent from "../../components/FormInputsComponent";

const Login = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col items-center bg-custom-color1 w-[400px] p-4 rounded-xl">
        <div>
          <img src={home} alt="WELCOME" className="rounded-xl" />
        </div>
        <div className="flex justify-center flex-col items-center mt-16 text-custom-color3 text-[20px]">
          <h2 className="font-bold">Welcome on board</h2>
          <h3 className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
            placeat.
          </h3>
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
          <h3 className="flex justify-center text-custom-color2 font-semibold  items-center">
            Forgot Password?
          </h3>
          </Link>
        </div>
        <div className="mt-5">
          <Link to={"/forum"}>
            <LargeButton children={"Login"} />
          </Link>
        </div>
        <div className="text-custom-color3 mt-3">
          <Link to={"/register"}>
            Don't have an account? <span className="text-custom-color3 font-semibold">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
