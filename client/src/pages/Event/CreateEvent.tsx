import { useEffect, useState } from "react";
import { MediumButton } from "../../components/Helpful Components/ButtonComponent";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPost } from "../../redux/forum/postSlice";
import { selectUser } from "../../redux/user/userSlice";
import FormInputsComponent from "../../components/Helpful Components/FormInputsComponent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import cover from "../../assets/share_image.jpg";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventThunk";
import { useValidateEventsForm } from "../../utils/validateEvent";

type CreateEvent = {
  title: string;
  location: string;
  music: string;
  price: string;
  description: string;
  files: FileList | [];
};

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createError } = useAppSelector(selectPost);
  const { currentUser } = useAppSelector(selectUser);
  const userId = currentUser?.user?.id;
  const { errors, hasError, validateForm, displayErrors } =
  useValidateEventsForm();

  const [data, setData] = useState<CreateEvent>({
    title: "",
    location: "",
    music: "",
    price: "",
    description: "",
    files: [],
  });

  const handleSubmit = () => {
    validateForm({
      title: data.title,
      description: data.description,
      location: data.location
    });
    displayErrors({
      title: data.title,
      description: data.description,
      location: data.location,
    });
  };

  useEffect(() => {
    if (!hasError) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("music", data.music);
      formData.append("cost", data.price);
      formData.append("user_id", userId || "");
      for (let i = 0; i < data.files.length; i++) {
        formData.append("file", data.files[i]);
      }
      dispatch(createEvent(formData));
      navigate("/events");
    }
  }, [hasError]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setData({ ...data, files: files });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl px-5 py-28 pl-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="flex text-2xl text-custom-color3 pb-4 justify-center font-semibold">
            What's your event about?
          </h2>
          <div className="mb-4">
            <label htmlFor="file" className="cursor-pointer">
              <img
                src={cover}
                alt="cover"
                className="top-16 w-[80px] h-[80px] rounded-full border border-custom-color3"
              />
              <input
                type="file"
                id="file"
                name="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer focus:outline-none focus:border-blue-500"
              />
               <span className={`text-sm text-gray-400 pl-1 pt-8 h-4`}>
                Attach any image if you want
              </span>
            </label>
          </div>

          <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <FormInputsComponent
                label="Date"
                id="date"
                type="date"
                placeholder="Date"
                name="date"
                // errorMessage={errors.date}
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
            onChange={(value: string) =>
              setData({ ...data, description: value })
            }
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
