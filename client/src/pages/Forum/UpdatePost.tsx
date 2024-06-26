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
import Loading from "../../components/Helpful Components/Loading";

const UpdatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { updateError, postDetails } = useAppSelector(selectPost);
  const { postId } = useParams();
  const { errors, hasError, validateForm, displayErrors } = useValidateUpdate();
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    postId: postId ?? "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (postId) {
      dispatch(getSinglePost(postId)).then(() => setIsLoading(false));
    }
  }, [dispatch, postId]);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validateForm(data);
    displayErrors(data);
    if (hasError) {
      return;
    }
    if (isFormChanged) {
      dispatch(updatePost(data)).then(() => navigate('/forum'));
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormChanged(true);
    const { value } = event.target;
    setData({ ...data, title: value });
  };

  const handleDescriptionChange = (value: string) => {
    setIsFormChanged(true);
    setData({ ...data, description: value });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl px-5 py-12 pl-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInputsComponent
            label="Title"
            id="title"
            type="text"
            placeholder="Title"
            name="title"
            value={data.title}
            errorMessage={errors.title}
            onChange={handleTitleChange}
          />

          <label
            htmlFor="description"
            className="block mb-2 mt-4 pl-1 font-semibold text-custom-color3"
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
          <div className="pt-12">
            <MediumButton>Save changes</MediumButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
