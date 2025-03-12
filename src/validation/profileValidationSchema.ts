import * as yup from "yup";

export const profileValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  location: yup.string().required("Location is required"),
  country: yup.string().required("Country is required"),
  birthdate: yup
    .date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate cannot be in the future"),
  avatar: yup.string().url("Avatar must be a valid URL").nullable(),
  gender: yup.string().oneOf(["male", "female", "other"], "Invalid gender"),
});
