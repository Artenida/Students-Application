import { useEffect, useState } from "react";
import { MediumButton } from "../../components/Helpful Components/ButtonComponent";
import { createPost } from "../../api/postThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPost } from "../../redux/forum/postSlice";
import { selectUser } from "../../redux/user/userSlice";
import { useValidateBlogForm } from "../../utils/validatePost";
import FormInputsComponent from "../../components/Helpful Components/FormInputsComponent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import cover from "../../assets/share_image.jpg";
import { useNavigate } from "react-router-dom";

type CreatePost = {
  title: string;
  description: string;
  files: FileList | [];
};

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { createError } = useAppSelector(selectPost);
  const { currentUser } = useAppSelector(selectUser);
  const userId = currentUser?.user?.id;
  const { errors, hasError, validateForm, displayErrors } =
    useValidateBlogForm();

  const [data, setData] = useState<CreatePost>({
    title: "",
    description: "",
    files: [],
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validateForm({
      title: data.title,
      description: data.description,
    });
    displayErrors({
      title: data.title,
      description: data.description,
    });
  };

  useEffect(() => {
    if (!hasError) {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("user_id", userId || "");
      for (let i = 0; i < data.files.length; i++) {
        formData.append("file", data.files[i]);
      }
      dispatch(createPost(formData))
      navigate('/forum');
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl px-5 py-28 pl-20">
        <form onClick={handleSubmit} className="space-y-4">
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
            </label>
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
            <MediumButton>Post</MediumButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
