import * as yup from "yup";
import { errorsText } from "@/common/errorsText";

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .email(errorsText.invalidEmail)
    .required(errorsText.emailRequired),
  password: yup.string().required(errorsText.passwordRequired),
});
