import { useState } from "react";

interface UpdatePost {
    title: string;
    description: string;
  }
  
  type CreatePostError = {
    title: string;
    description: string;
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
  
  export const useValidateUpdate = () => {
    const [errors, setErrors] = useState<CreatePostError>({
      title: '',
      description: '',
    });
  
    const [hasError, setHasError] = useState(true);
  
    const validateForm = (inputs: UpdatePost) => {
      const titleError = validateTitle(inputs.title);
      const descriptionError = validateDescription(inputs.description);
      setHasError(!!(titleError || descriptionError));
    }
  
    const displayErrors = (inputs: UpdatePost) => {
      const titleError = validateTitle(inputs.title);
      const descriptionError = validateDescription(inputs.description);
      setErrors({title: titleError, description: descriptionError})
    }
  
    return {
      errors,
      hasError,
      validateForm,
      displayErrors,
    }
  };
  