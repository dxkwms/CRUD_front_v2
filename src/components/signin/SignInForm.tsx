import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommonButton } from "@/components/common/CommonButton";
import { useRefreshTokenMutation, useSignInMutation } from "@/lib/api/usersApi";
import { signInValidationSchema } from "@/validation/signInValidationSchema";
import { Typography } from "@/components/common/Typography";
import { Role } from "@/types/IUser";

export const SignInForm = () => {
  const [isRememberMeActive, setIsRememberMeActive] = useState(false);
  const [signIn] = useSignInMutation();
  const [refreshToken] = useRefreshTokenMutation();
  const router = useRouter();

  const onLoginSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await signIn(values).unwrap();
      const { token, user } = response;

      if (!token) {
        console.error("Login failed:", response.message);
        return;
      }

      localStorage.setItem("token", token);

      if (isRememberMeActive) {
        await refreshToken(token).unwrap();
      }

      localStorage.setItem("user", JSON.stringify(user));

      const userRoleRoute = user.role === Role.Admin ? "/admin/q" : "/user/q";
      router.push(`${userRoleRoute}?id=${user._id}`);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signInValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onLoginSubmit(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative p-8 bg-black rounded-2xl shadow-lg max-w-sm w-full bg-opacity-75">
            <Typography variant="h2" className=" text-white text-center">
              Sign In
            </Typography>

            <Form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
                className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.email && touched.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
              <Field
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Password"
              />
              {errors.password && touched.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
              <Field
                type="checkbox"
                id="remember_me"
                className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700"
                onChange={(e) => {
                  setIsRememberMeActive(e.target.checked);
                }}
                checked={isRememberMeActive}
              />
              <label htmlFor="remember_me" className="ml-2 text-gray-400">
                Remember me
              </label>
              <CommonButton buttonText="Sign in" isDisabled={isSubmitting} />
            </Form>

            <div className="text-textWhite">
              <Link href="/">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
