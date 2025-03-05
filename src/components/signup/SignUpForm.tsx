"use client";

import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useAddAvatarMutation } from "@/lib/api/avatarApi";
import { useCreateUserMutation } from "@/lib/api/usersApi";
import { IUser, Role } from "@/types/IUser";
import { CommonButton } from "@/components/common/CommonButton";
import { Typography } from "@/components/common/Typography";
import { Avatar } from "@/components/common/Avatar";
import { signUpValidationSchema } from "@/validation/signUpValidationSchema";
import { errorsText } from "@/common/errorsText";
import Link from "next/link";

export const SignUpForm = () => {
  const [avatar, setAvatar] = useState<File | null>(null);

  const [createUser] = useCreateUserMutation();
  const [addAvatar] = useAddAvatarMutation();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onFormSubmit = async (
    values: IUser,
    setFieldError: (field: string, message: string | undefined) => void,
  ) => {
    try {
      if (!avatar) {
        setFieldError("avatar", errorsText.avatarRequired);
        return;
      }

      const formData = new FormData();
      formData.append("file", avatar);

      const response = await addAvatar({ formData, avatar }).unwrap();

      if (!response.url) {
        setFieldError("avatar", errorsText.avatarUpload);
        return;
      }

      values.avatar = response.url;

      await createUser(values).unwrap();
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const onAvatarClick = () => {
    if (!inputFileRef.current) {
      return;
    }

    inputFileRef.current.click();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        role: Role.User,
        avatar: "",
        profiles: [],
      }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        onFormSubmit(values, setFieldError);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <section className="flex items-center justify-center min-h-screen">
          <div className="relative p-8 bg-black rounded-2xl shadow-lg max-w-sm w-full bg-opacity-75">
            <Typography variant="h2" className="text-center text-white">
              Sign up
            </Typography>

            <Avatar avatar={avatar} onAvatarClick={onAvatarClick} />

            <Typography variant="caption" className="mt-2 text-center ">
              Choose picture
            </Typography>
            <Form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="file"
                accept="image/*"
                ref={inputFileRef}
                onChange={(e) => {
                  if (e.target.files) {
                    setAvatar(e.target.files?.[0]);
                  }
                }}
                className="hidden"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.email && touched.email && <div>{errors.email}</div>}

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}

              <Field
                type="text"
                name="name"
                placeholder="Nickname"
                className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              {errors.name && touched.name && <div>{errors.name}</div>}

              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="role"
                  id="admin"
                  className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700"
                  onChange={(e) => {
                    setFieldValue(
                      "role",
                      e.target.checked ? Role.Admin : Role.User,
                    );
                  }}
                  checked={values.role === Role.Admin}
                />
                <label htmlFor="admin" className="ml-2 text-gray-400">
                  Admin
                </label>
              </div>

              <CommonButton buttonText={"Sign up"} isDisabled={isSubmitting} />
            </Form>
            <div className="text-textWhite flex items-center justify-center">
              Have an account?
              <Link href={"/signIn"}>
                <Typography variant={"caption"} className="text-buttonColor">
                  Sign in
                </Typography>
              </Link>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
};
