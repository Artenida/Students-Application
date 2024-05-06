import { useState } from "react";

interface CreatePost {
  title: string;
  description: string;
  file: FileList | [];
}

type CreatePostError = {
  title: string;
  description: string;
  files: string;
};

const validateTitle = (value: string): string => {
  if (!value.trim()) {
    return "Title is required";
  }
  return "";
};

const validateDescription = (value: string): string => {
  if (!value.trim()) {
    return "Description is required";
  }
  return "";
};


export const validateFiles = (files: FileList | []) => {
  if (files) {
    return files.length === 0 ? "Please upload at least one image" : "";
  }
  return "";
};

export const useValidateBlogForm = () => {
  const [errors, setErrors] = useState<CreatePostError>({
    title: '',
    description: '',
    files: '',
  });

  const [hasError, setHasError] = useState(true);

  const validateForm = (inputs: CreatePost) => {
    const titleError = validateTitle(inputs.title);
    const descriptionError = validateDescription(inputs.description);
    const filesError = validateFiles(inputs.file);
    setHasError(!!(titleError || descriptionError || filesError));
  }

  const displayErrors = (inputs: CreatePost) => {
    const titleError = validateTitle(inputs.title);
    const descriptionError = validateDescription(inputs.description);
    const filesError = validateFiles(inputs.file);
    setErrors({title: titleError, description: descriptionError, files: filesError})
  }

  return {
    errors,
    hasError,
    validateForm,
    displayErrors,
  }
};
