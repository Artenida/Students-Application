import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contact } from "../../api/userThunk";
import image from "../../assets/home2.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import FormInputsComponent from "../../components/Helpful Components/FormInputsComponent";
import { MediumButton } from "../../components/Helpful Components/ButtonComponent";

const Contact = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector(selectUser);

  const [formData, setFormData] = useState({
    from: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(contact(formData)); // Dispatch the action with the payload directly
      alert('Email sent successfully');
    } catch (err) {
      alert('Error sending email');
    }
  };

  return (
    <div className="mx-8 md:mx-28 grid grid-cols-1 md:grid-cols-2 gap-6 pt-32 pl-16">
      <div className="flex justify-center items-center">
        <img src={image} alt="Cover" className="w-[200px] md:w-[380px] h-[200px] md:h-[380px]" />
      </div>
      <div className="flex justify-center gap-4 flex-col">
        <div>
          <h2 className="font-bold text-[30px] text-custom-color3">Contact Us</h2>
          <h5 className="mt-1 text-custom-color4">
            Have questions or feedback? We're here to help. Send us a message,
            and we'll respond within 24 hours.
          </h5>
        </div>
        <form onSubmit={handleSubmit} className="flex justify-between flex-col gap-4">
          <FormInputsComponent
            id="from"
            name="from"
            label="Email"
            type="email"
            placeholder="Enter email"
            value={formData.from}
            onChange={handleChange}
          />
          <FormInputsComponent
            id="subject"
            name="subject"
            label="Subject"
            type="text"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <label
              htmlFor="message"
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
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mt-4">
            <MediumButton children="Send Message"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
