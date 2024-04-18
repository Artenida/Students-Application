import image from "../../assets/home2.jpg";
import { MediumButton } from "../../components/ButtonComponent";
import FormInputsComponent from "../../components/FormInputsComponent";

const Contact = () => {
  return (
    <div className="m-4 md:mx-28 grid grid-cols-1 md:grid-cols-2 gap-6 border border-custom-color2 p-4 rounded-xl">
      <div className="flex justify-center items-center">
        <img src={image} alt="Cover" className="w-[380px] h-[380px]"/>
      </div>
      <div className="flex justify-center gap-4 flex-col">
        <div>
        <h2 className="font-bold text-[30px] text-custom-color3">Contact Us</h2>
          <h5 className="mt-1 text-custom-color4">
            Have questions or feedback? We're here to help. Send us a message,
            and we'll respond within 24 hours
          </h5>
        </div>
        <div>
          <FormInputsComponent
            id="username"
            label="Username"
            type="text"
            placeholder="Enter username"
          />
          <FormInputsComponent
            id="email"
            label="Email"
            type="email"
            placeholder="Enter email"
          />
          <div className="flex flex-col">
            <label
              htmlFor={"message"}
              className="font-semibold text-custom-color3 pl-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols={30}
              rows={10}
              className="mt-2 resize-none rounded-lg p-2 border border-custom-color2 focus:border-custom-color3 focus:outline-none"
              ></textarea>
          </div>
          <div className="mt-4">
          <MediumButton children={"Send Message"}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
