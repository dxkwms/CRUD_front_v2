import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CommonButton } from "@/components/common/CommonButton";
import { signInValidationSchema } from "@/validation/signInValidationSchema";
import { Typography } from "@/components/common/Typography";
import { Role } from "@/types/IUser";
import { errorsText } from "@/common/errorsText";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/slice/userSlice";
import { useSignInMutation } from "@/lib/api/signInApi";
import { useGetUserByTokenQuery } from "@/lib/api/usersApi";
import { ROUTES } from "@/types/routesEnum";
import { ErrorComponent } from "@/components/error/ErrorComponent";

export const SignInForm = () => {
  const [isRememberMeActive, setIsRememberMeActive] = useState(false);
  const [authError, setAuthError] = useState("");
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = localStorage.getItem("token");

  const { data: userData, isLoading } = useGetUserByTokenQuery(accessToken, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
      const userRoleRoute =
        userData.role === Role.Admin ? "/admin/q" : "/user/q";
      router.push(`${userRoleRoute}?id=${userData._id}`);
    }
  }, [userData, dispatch, router]);

  const onLoginSubmit = async (
    values: { email: string; password: string },
    setFieldError: (field: string, message: string | undefined) => void,
  ) => {
    try {
      const { accessToken, user } = await signIn(values).unwrap();

      if (!accessToken) {
        setFieldError("login", errorsText.loginError);
        return;
      }

      dispatch(setUser(user));

      if (isRememberMeActive) {
        localStorage.setItem("token", accessToken);
      }

      const userRoleRoute = user.role === Role.Admin ? "/admin/q" : "/user/q";
      router.push(`${userRoleRoute}?id=${user._id}`);
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError("Incorrect email or password");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signInValidationSchema}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        setSubmitting(false);
        onLoginSubmit(values, setFieldError);
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
        <section className="flex items-center justify-center min-h-screen">
          <div className="relative p-8 bg-black rounded-2xl shadow-lg max-w-sm w-full bg-opacity-75">
            <Typography variant="h2" className=" text-white text-center">
              Sign In
            </Typography>
            <ErrorComponent errorValue={authError} />
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
              <CommonButton disabled={isSubmitting}>Sign in</CommonButton>
            </Form>

            <div className="text-textWhite text-center mt-3">
              Don’t have an account?{" "}
              <Link
                href={ROUTES.SIGN_UP}
                className="font-bold text-buttonColor"
              >
                Sign up
              </Link>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
};
