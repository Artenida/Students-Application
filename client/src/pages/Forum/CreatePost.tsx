import { useEffect, useState } from "react";
import { MediumButton } from "../../components/ButtonComponent";
import { createPost } from "../../api/postThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPost } from "../../redux/forum/postSlice";
import { selectUser } from "../../redux/user/userSlice";
import { useValidateBlogForm } from "../../utils/validatePost";
import FormInputsComponent from "../../components/FormInputsComponent";

type CreatePost = {
  title: string;
  description: string;
  files: FileList | [];
};

const CreatePost = () => {
  const dispatch = useAppDispatch();
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

  const handleSubmit = () => {
    validateForm({
      title: data.title,
      description: data.description,
      file: data.files,
    });
    displayErrors({
      title: data.title,
      description: data.description,
      file: data.files,
    });
  };

  useEffect(() => {
    if (!hasError) {
      const cleanedDescription = data.description.replace(/<[^>]+>/g, "");

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", cleanedDescription);
      formData.append("user_id", userId || "");
      for (let i = 0; i < data.files.length; i++) {
        formData.append("file", data.files[i]);
      }
      dispatch(createPost(formData));
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

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
          <div className="mb-4">
            <input
              type="file"
              id="file"
              name="file"
              multiple
              required
              onChange={handleFileChange}
            />
          </div>
          <span
            className={`text-sm text-red-600 pl-1 pt-1 ${
              errors.files ? "block" : "hidden"
            } h-4`}
          >
            {errors.files}
          </span>
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
            <MediumButton onClick={handleSubmit}>Publish</MediumButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
