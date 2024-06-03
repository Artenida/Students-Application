import { useEffect, useState } from "react";
import { MediumButton } from "../../components/Helpful Components/ButtonComponent";
import { getSinglePost, updatePost } from "../../api/postThunk";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPost } from "../../redux/forum/postSlice";
import { useValidateUpdate } from "../../utils/validateUpdate";
import FormInputsComponent from "../../components/Helpful Components/FormInputsComponent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { selectEvent } from "../../redux/forum/eventSlice";
import { createEvent } from "@testing-library/react";
import { useValidateEventsForm } from "../../utils/validateEvent";
import { getSingleEvent } from "../../api/eventThunk";

type CreateEvent = {
  title: string;
  description: string;
  files: FileList | [];
};

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { updateError } = useAppSelector(selectPost);
  const { id } = useParams();
  const { errors, hasError, validateForm, displayErrors } = useValidateEventsForm();
    const { eventDetails } = useAppSelector(selectEvent);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    dispatch(getSingleEvent(id));
  }, [dispatch, id]);

  const [data, setData] = useState({
    eventId: id ?? "",
    // date: Date,
    music: "",
    location: "",
    price: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (eventDetails && eventDetails.length > 0) {
      const eventData = eventDetails[0];
      setData({
        eventId: id ?? "",
        // date: eventData.date,
        title: eventData.title,
        music: eventData.music,
        location: eventData.location,
        price: eventData.cost,
        description: eventData.description,
      });
    }
  }, [eventDetails, id]);

  const handleSubmit = () => {
    validateForm(data);
    displayErrors(data);
    if (hasError) {
      return;
    }
    if (isFormChanged) {
      // dispatch(createEvent(data));
      navigate("/events");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, title: value });
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, location: value });
  };

  const handleMusicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, music: value });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, price: value });
  };

  const handleDescriptionChange = (value: string) => {
    setIsFormChanged(true);
    setData({ ...data, description: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl px-5 py-28 pl-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <h2 className="flex text-2xl text-custom-color3 pb-4 justify-center font-semibold">
            What's your event about?
          </h2> */}
          <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <FormInputsComponent
                label="Date"
                id="date"
                type="date"
                placeholder="Date"
                name="date"
                // value={data.date}
                // errorMessage={errors.title}
                // updateValue={(value) => setData({ ...data, title: value })}
                // onChange={handleTitleChange}
              />
            </div>
            <div className="w-1/2">
              <FormInputsComponent
                label="Location"
                id="location"
                type="text"
                placeholder="Location"
                name="location"
                value={data.location}
                errorMessage={errors.location}
                updateValue={(value) => setData({ ...data, location: value })}
                onChange={handleLocationChange}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <FormInputsComponent
                label="Music"
                id="music"
                type="text"
                placeholder="Music"
                name="music"
                value={data.music}
                updateValue={(value) => setData({ ...data, music: value })}
                onChange={handleMusicChange}
              />
              <span className={`text-sm text-gray-400 pl-1 pt-8 h-4`}>
                Might leave empty
              </span>
            </div>

            <div className="w-1/2">
              <FormInputsComponent
                label="Price"
                id="cost"
                type="text"
                placeholder="Price"
                name="cost"
                value={data.price}
                updateValue={(value) => setData({ ...data, price: value })}
                onChange={handlePriceChange}
              />
              <span className={`text-sm text-gray-400 pl-1 pt-8 h-4`}>
                Might leave empty
              </span>
            </div>
          </div>

          <FormInputsComponent
            label="Title"
            id="title"
            type="text"
            placeholder="Title"
            name="file"
            value={data.title}
            errorMessage={errors.title}
            updateValue={(value) => setData({ ...data, title: value })}
            onChange={handleTitleChange}
          />

          <label
            htmlFor="description"
            className="block mb-2 mt-12 pl-1 font-semibold text-custom-color3"
          >
            Description
          </label>
          <ReactQuill
            theme="snow"
            style={{ height: "300px" }}
            className="mb-4"
            value={data.description}
            onChange={handleDescriptionChange}
          />
          <span
            className={`text-sm text-red-600 pl-1 pt-8 ${
              errors.description ? "block" : "hidden"
            } h-4`}
          >
            {errors.description}
          </span>

          <div className="pt-12">
            <MediumButton onClick={handleSubmit}>Post</MediumButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
