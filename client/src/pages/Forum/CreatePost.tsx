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
  const { errors, hasError, validateForm, displayErrors } = useValidateBlogForm();
  const [success, setSuccess] = useState(false);

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
      dispatch(createPost(formData)).then(() => setSuccess(true));
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

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setData({ ...data, description: value });
  };

  return (
    <div className="flex flex-col md:flex-row -z-50">
      <div className="border-r-4 border-opacity-50 my-12 ml-4 border-custom-color2 h-[900px]"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div
            className="flex justify-between items-start gap-8"
            onSubmit={handleSubmit}
          >
            <div className="w-2/3 flex flex-col">
              <input
                type="file"
                id="file"
                name="file"
                multiple
                required
                onChange={handleFileChange}
              />
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
                className="block mb-2 mt-12 pl-1 font-semibold"
              >
                Description
              </label>
              <FormInputsComponent
                label="Description"
                id="description"
                type="text"
                placeholder="Description"
                name="file"
                errorMessage={errors.title}
                updateValue={(value) => setData({ ...data, description: value })}
                onChange={handleDescriptionChange}
              />
              <span
                className={`text-sm text-red-600 pl-1 pt-8 ${
                  errors.description ? "block" : "hidden"
                } h-4`}
              >
                {errors.description}
              </span>

              {success && (
                <div className="bg-green-200 py-2 px-6 text-green-500 mt-12">
                  Post is published
                </div>
              )}

              {createError && (
                <div className="bg-red-200 py-2 px-6 text-red-500 mt-12">
                  {createError}
                </div>
              )}
              <div className="mt-8">
                <MediumButton onClick={handleSubmit}>Publish</MediumButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
