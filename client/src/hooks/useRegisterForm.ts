import { useState } from "react";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validateUser";

export type SignupBodyType = {
  username: string;
  email: string;
  password: string;
  verify: string;
};

export const useRegisterForm = () => {
  const [errors, setErrors] = useState<SignupBodyType>({
    username: "",
    email: "",
    password: "",
    verify: "",
  });

  const [hasErrors, setHasErrors] = useState<boolean>(true);

  const displayErrors = (inputs: SignupBodyType) => {
    const usernameError = validateUsername(inputs.username);
    const emailError = validateEmail(inputs.email);
    const passwordError = validatePassword(inputs.password);
    const verifyPasswordError = validateConfirmPassword(
      inputs.password,
      inputs.verify
    );

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      verify: verifyPasswordError,
    });
  };

  const validateForm = (inputs: SignupBodyType) => {
    const usernameError = validateUsername(inputs.username);
    const emailError = validateEmail(inputs.email);
    const passwordError = validatePassword(inputs.password);
    const verifyPasswordError = validateConfirmPassword(
      inputs.password,
      inputs.verify
    );

    setHasErrors(
      Boolean(
        usernameError || emailError || passwordError || verifyPasswordError
      )
    );

    setErrors({
      username: usernameError,
      password: passwordError,
      email: emailError,
      verify: verifyPasswordError,
    });
  };

  return {
    errors,
    hasErrors,
    validateForm,
    displayErrors,
  };
};
