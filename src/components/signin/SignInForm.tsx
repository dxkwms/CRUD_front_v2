import { Formik } from "formik";
import { DATABASE_URL } from "@/api/DATABASE_URL";
import { useGetUserByIdQuery } from "@/services/users";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
  const [isRememberMeActive, setIsRememberMeActive] = useState<boolean>(false);
  const { data, error, isLoading } = useGetUserByIdQuery(
    "6797709a31c719d6e9933497",
  );

  const router = useRouter();

  const refreshToken = async (oldToken: string) => {
    const response = await fetch(`${DATABASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: oldToken }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
    } else {
      console.log("Failed to refresh token:", data.message);
    }
  };

  const onLoginSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(`${DATABASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (isRememberMeActive) {
          refreshToken(data.token);
        }

        if (data.user.role === "admin") {
          router.push(`/admin/q?id=${data.user._id}`);
        } else {
          router.push(`/user/q?id=${data.user._id}`);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isLoading) return <div>Loading</div>;

  console.log(data);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
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
            <h2 className="text-2xl font-bold text-white text-center">
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder={"Email"}
                  className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                {errors.email && touched.email && errors.email}
              </div>
              <div className={"p-2"}>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder={"Password"}
                />
                {errors.password && touched.password && errors.password}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/3 py-2 bg-buttonColor text-white font-bold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 self-center justify-self-center flex text-center"
              >
                Submit
              </button>
            </form>
            <div>
              <input
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
            </div>
            <div className="text-textWhite">
              <Link href={"/"}>Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
