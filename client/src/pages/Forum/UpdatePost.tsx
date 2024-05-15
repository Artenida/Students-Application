import { useEffect, useState } from "react";
import { MediumButton } from "../../components/ButtonComponent";
import { getSinglePost, updatePost } from "../../api/postThunk";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPost } from "../../redux/forum/postSlice";
import { useValidateUpdate } from "../../utils/validateUpdate";
import FormInputsComponent from "../../components/FormInputsComponent";

const UpdatePost = () => {
  const dispatch = useAppDispatch();
  const { updateError } = useAppSelector(selectPost);
  const { postId } = useParams();
  const { errors, hasError, validateForm, displayErrors } = useValidateUpdate();
  const { postDetails } = useAppSelector(selectPost);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch, postId])

  const [data, setData] = useState({
    postId: postId ?? "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (postDetails && postDetails.length > 0) {
      const postData = postDetails[0];
      setData({
        postId: postId ?? "",
        title: postData.title,
        description: postData.description,
      });
    }
  }, [postDetails, postId]);

  const handleSubmit = () => {
    validateForm(data);
    displayErrors(data);
    if (hasError) {
      return;
    }
    if (isFormChanged) {
      dispatch(updatePost(data));
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, title: value });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, description: value });
  };  

  return (
    <div className="flex justify-center pt-48">
      <div className="flex bg-custom-color1 py-12 px-4 rounded-xl">
        <div
          className="flex flex-col justify-center w-[800px] px-12"
          onSubmit={handleSubmit}
        >
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
            className="block mb-2 mt-4 pl-1 font-semibold text-custom-color3"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            name="file"
            value={data.description}
            onChange={handleDescriptionChange}
            className="border border-custom-color2 rounded-md p-2 resize-none h-40"
            rows={5}
          />
          <span
            className={`text-sm text-red-600 pl-1 pt-8 ${
              errors.description ? "block" : "hidden"
            } h-4`}
          >
            {errors.description}
          </span>

          <div className="mt-8">
            <MediumButton onClick={handleSubmit}>Save changes</MediumButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;