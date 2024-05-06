import { useEffect, useState } from "react";
import { MediumButton } from "../../components/ButtonComponent";
import { getSinglePost, updatePost } from "../../api/postThunk";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPost } from "../../redux/forum/postSlice";
import { useValidateUpdate } from "../../utils/validateUpdate";
import FormInputsComponent from "../../components/FormInputsComponent";

interface Tag {
  id: number;
  name: string;
}

const UpdatePost = () => {
  const dispatch = useAppDispatch();
  const { updateError } = useAppSelector(selectPost);
  const { postId } = useParams();
  const { errors, hasError, validateForm, displayErrors } = useValidateUpdate();
  const { postDetails } = useAppSelector(selectPost);
  const [postSuccess, setPostSuccess] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [message, setMessage] = useState(false);

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

  const handlePostSuccessClose = () => {
    setPostSuccess(false);
  };

  const handleSubmit = () => {
    validateForm(data);
    displayErrors(data);
    if (hasError) {
      return;
    }
    if (isFormChanged) {
      setMessage(false);
      dispatch(updatePost(data)).then(() => setPostSuccess(true));
    } else {
      setMessage(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, title: value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, description: value });
  };

//   const handleDescriptionChange = (value: string) => {
//     setIsFormChanged(true);
//     setData({ ...data, description: value });
//   };

  return (
    <div className="flex flex-col md:flex-row -z-50">
      <Sidebar />
      <div className="border-r-4 border-opacity-50 my-12 ml-4 border-custom-color2"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-start gap-8">
            <div className="w-2/3 flex flex-col">
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
              {/* <label
                htmlFor="description"
                className="block mb-2 mt-12 pl-1 font-semibold"
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
                className={`text-red-600 text-sm pl-1 pt-1 ${
                  errors.description ? "block" : "hidden"
                } mt-4`}
              >
                {errors.description}
              </span> */}
              <FormInputsComponent
                label="Description"
                id="description"
                type="text"
                placeholder="Description"
                name="file"
                value={data.description}
                errorMessage={errors.description}
                updateValue={(value) => setData({ ...data, description: value })}
                onChange={handleDescriptionChange}
              />
              {/* {postSuccess && (
                <div
                  onClose={handlePostSuccessClose}
                  className="bg-green-200 py-2 px-6 text-green-500"
                >
                  Post is updated successfully
                </div>
              )} */}
              {updateError && (
                <div className="mt-10">
                  <div className="bg-red-200 py-2 px-6 text-red-600">
                    {updateError}
                  </div>
                </div>
              )}

              {message && (
                <div className="mt-10">
                  <div className="bg-red-200 py-2 px-6 text-red-600">
                    "You haven't made any changes to the post"
                  </div>
                </div>
              )}

              <div className="mt-8">
                <MediumButton onClick={handleSubmit}>Save changes</MediumButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
