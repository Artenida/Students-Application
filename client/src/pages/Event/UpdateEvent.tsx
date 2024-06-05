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
import { getSingleEvent, updateEvent } from "../../api/eventThunk";
import { selectUser } from "../../redux/user/userSlice";
import { selectCategories } from "../../redux/forum/categoriesSlice";
import { retrieveAllCategories } from "../../api/categoriesThunk";

interface Categories {
  id: number;
  category: string;
}

type CreateEvent = {
  title: string;
  description: string;
  files: FileList | [];
};

const UpdateEvent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { errors, hasError, validateForm, displayErrors } =
    useValidateEventsForm();
  const { eventDetails } = useAppSelector(selectEvent);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const { categories, loading, retrieveError } = useAppSelector(selectCategories);
  const {currentUser} = useAppSelector(selectUser);
 

  const [data, setData] = useState({
    id: id ?? "",
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    user_id: "",
    music: "",
    cost: "",
    categories: [] as string[],
  });

  useEffect(() => {
    categories?.length === 0 && dispatch(retrieveAllCategories());
    dispatch(getSingleEvent(id));
  }, [dispatch, id, categories]);

  useEffect(() => {
    if (eventDetails && eventDetails.length > 0) {
      const eventData = eventDetails[0];
      setData({
        id: id ?? "",
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        user_id: currentUser?.user?.id,
        music: eventData.music,
        cost: eventData.cost,
        categories: eventData.categories.map((category: any) =>
        category?.id.toString()
        ),
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
      dispatch(updateEvent(data));
      navigate("/events");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, title: value });
  };

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = data.categories.includes(categoryId)
      ? data.categories.filter((id) => id !== categoryId)
      : [...data.categories, categoryId];
    setData({ ...data, categories: updatedCategories });
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
    setData({ ...data, cost: value });
  };

  const handleDescriptionChange = (value: string) => {
    setIsFormChanged(true);
    setData({ ...data, description: value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, date: value });
  };
  
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, time: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl px-5 py-28 pl-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="flex text-2xl text-custom-color3 pb-4 justify-center font-semibold">
            Make your changes!
          </h2>

          <div className="flex justify-between px-4 text-xl pt-4">
            {categories?.map((category: Categories) => (
              <ul>
                <li key={category.id} className="mb-2">
                  <input
                    type="checkbox"
                    id={`${category.id}`}
                    className="mr-2"
                    onChange={() => handleCategoryChange(String(category.id))}
                    checked={data.categories.includes(String(category.id))}
                  />
                  <label htmlFor={`tag-${category.id}`}>
                    {category.category}
                  </label>
                </li>
              </ul>
            ))}
          </div>
          
          <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <FormInputsComponent
                label="Date"
                id="date"
                type="date"
                placeholder="Date"
                name="date"
                value={data.date}
                errorMessage={errors.title}
                updateValue={(value) => setData({ ...data, date: value })}
                onChange={handleTitleChange}
              />
            </div>
            <div className="w-1/2">
              <FormInputsComponent
                label="Time"
                id="time"
                type="time"
                placeholder="Time"
                name="time"
                value={data.time}
                errorMessage={errors.time}
                updateValue={(value) => setData({ ...data, time: value })}
                onChange={handleTimeChange}
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
                value={data.cost}
                updateValue={(value) => setData({ ...data, cost: value })}
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

export default UpdateEvent;
