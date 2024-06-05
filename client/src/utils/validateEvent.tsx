import { useState } from "react";

interface CreateEvent {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
}

type CreateEventError = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
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

const validateLocation = (value: string): string => {
  if (!value.trim()) {
    return "Location is required";
  }
  return "";
};

const validateDate = (value: string): string => {
  if (!value.trim()) {
    return "Date is required";
  }
  return "";
};

const validateTime = (value: string): string => {
  if (!value.trim()) {
    return "Time is required";
  }
  return "";
};

export const validateFiles = (files: FileList | []) => {
  if (files) {
    return files.length === 0 ? "Please upload at least one image" : "";
  }
  return "";
};

export const useValidateEventsForm = () => {
  const [errors, setErrors] = useState<CreateEventError>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const [hasError, setHasError] = useState(true);

  const validateForm = (inputs: CreateEvent) => {
    const titleError = validateTitle(inputs.title);
    const descriptionError = validateDescription(inputs.description);
    setHasError(!!(titleError || descriptionError));
  }

  const displayErrors = (inputs: CreateEvent) => {
    const titleError = validateTitle(inputs.title);
    const descriptionError = validateDescription(inputs.description);
    // const date = validateDate();
    const locationError = validateLocation(inputs.location);
    const dateError = validateDate(inputs.date);
    const timeError = validateTime(inputs.time);
    setErrors({title: titleError, description: descriptionError, location: locationError, date: dateError, time: timeError})
  }

  return {
    errors,
    hasError,
    validateForm,
    displayErrors,
  }
};
