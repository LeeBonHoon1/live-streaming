export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

export const PASSWORD_ERROR_MESSAGE =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";
