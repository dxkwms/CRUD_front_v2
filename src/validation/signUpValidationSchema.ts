import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required")
    .test("email-unique", "Email already in use", async (value) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/email/${value}`,
      );
      if (response.ok) {
        const user = await response.json();
        return !user;
      }
      return true;
    }),
  password: yup.string().required("Required").min(6, "Password too short"),
});
