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

type CreateEvent = {
  title: string;
  description: string;
  files: FileList | [];
};

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { updateError } = useAppSelector(selectPost);
  const { eventId } = useParams();
  const { errors, hasError, validateForm, displayErrors } = useValidateUpdate();
  const { postDetails } = useAppSelector(selectPost);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    dispatch(getSinglePost(eventId));
  }, [dispatch, eventId]);

  const [data, setData] = useState({
    eventId: eventId ?? "",
    // date: "",
    // music: "",
    // location: "",
    // price: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (postDetails && postDetails.length > 0) {
      const postData = postDetails[0];
      setData({
        eventId: eventId ?? "",
        title: postData.title,
        description: postData.description,
      });
    }
  }, [postDetails, eventId]);

  const handleSubmit = () => {
    validateForm(data);
    displayErrors(data);
    if (hasError) {
      return;
    }
    if (isFormChanged) {
    //   dispatch(updatePost(data));
      navigate("/forum");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, title: value });
  };
//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsFormChanged(true);
//     const { value } = event.target;
//     setData({ ...data, title: value });
//   };
//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsFormChanged(true);
//     const { value } = event.target;
//     setData({ ...data, title: value });
//   };

  // const handleDescriptionChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setIsFormChanged(true);
  //   const { value } = event.target;
  //   setData({ ...data, description: value });
  // };

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
                // value={data.title}
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
                // value={data.title}
                // errorMessage={errors.title}
                // updateValue={(value) => setData({ ...data, title: value })}
                // onChange={handleTitleChange}
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
                // value={data.title}
                // errorMessage={errors.title}
                // updateValue={(value) => setData({ ...data, title: value })}
                // onChange={handleTitleChange}
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
                // value={data.title}
                // errorMessage={errors.title}
                // updateValue={(value) => setData({ ...data, title: value })}
                // onChange={handleTitleChange}
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
