import { Link } from "react-router-dom";
import FormInputsComponent from "../../components/FormInputsComponent";
import { LargeButton, MediumButton } from "../../components/ButtonComponent";
import home from "../../assets/home.png";

const Register = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-custom-color1 w-full max-w-md p-4 rounded-xl">
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
          />
          <FormInputsComponent
            id={"email"}
            label={"Email"}
            placeholder="Enter your email"
          />
          <FormInputsComponent
            id={"password"}
            label={"Password"}
            placeholder="Enter password"
          />
          <FormInputsComponent
            id={"confirmPassword"}
            label={"Password"}
            placeholder="Confirm password"
          />
        </div>
        <div className="mt-5">
          <Link to={"/login"}>
            <MediumButton children={"Register"} />
          </Link>
        </div>
        <div className="text-custom-color3 mt-3">
          <Link to={"/login"}>
            Already have an account? <span className="text-custom-color3 font-semibold">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );};

export default Register;
