interface FormRegisterErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormLoginErrors {
  username: string;
  password: string;
}

interface FormUpdateErrors {
  username: string;
  email: string;
  subject: string;
  bio: string;
}

export function validateUsername(value: string): string {
   if (!value.trim()) {
    return "Username is required";
  }
  return "";
}

export function validateUniversity (value: string): string {
  if (!value.trim()) {
    return "Username is required";
  }
  return "";
};

export function validateEmail(value: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Enter a valid email.";
}

export function validatePassword(value: string): string {
    if (!value.trim()) {
        return "Password is required";
      } else if (value.length < 8) {
        return "Password must be at least 8 characters";
      }
      return "";
}

export const validateBio = (value: string): string => {
  return value.trim().length <= 30 ? "" : "Bio must be at most 30 characters";
};

export function validateConfirmPassword(password: string, verify: string) {
  return password === verify ? "" : "Passwords should match.";
}

export const validateRegisterForm = (
  id: string,
  value: string,
  formData: FormRegisterErrors
): FormRegisterErrors => {
  let errors: FormRegisterErrors = { ...formData };

  if (id === "username") {
    errors.username = validateUsername(value);
  } else if (id === "email") {
    errors.email = validateEmail(value);
  } else if (id === "password") {
    errors.password = validatePassword(value);
  }
  return errors;
};

export const validateLoginForm = (
  id: string,
  value: string,
  formData: FormLoginErrors
): FormLoginErrors => {
  let errors: FormLoginErrors = { ...formData };

  if (id === "username") {
    errors.username = validateUsername(value);
  }
  if (id === "password") {
    errors.password = validatePassword(value);
  }
  return errors;
};

export const validateUpdateForm = (
  id: string,
  value: string,
  formData: FormUpdateErrors
): FormUpdateErrors => {
  let errors: FormUpdateErrors = { ...formData };

  if (id === "username") {
    errors.username = validateUsername(value);
  }
  if (id === "email") {
    errors.email = validateEmail(value);
  }
  if (id === "subject") {
    errors.subject = validateUniversity(value);
  }
  if (id === "bio") {
    errors.subject = validateBio(value);
  }
  return errors;
};