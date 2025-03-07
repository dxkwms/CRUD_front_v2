import * as yup from "yup";
import { errorsText } from "@/common/errorsText";

export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .email(errorsText.invalidEmail)
    .required(errorsText.emailRequired),

  password: yup
    .string()
    .required(errorsText.passwordRequired)
    .min(6, errorsText.passwordToShort),
});
