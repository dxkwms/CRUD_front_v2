"use client";

import { useState, useRef } from "react";
import { Formik } from "formik";
import { DATABASE_URL } from "@/api/DATABASE_URL";
import { useCreateUserMutation } from "@/services/users";
import Link from "next/link";
import type { PutBlobResult } from "@vercel/blob";
import { onAvatarUpload } from "@/fitch/onAvatarUpload";
import { IProfile } from "@/types/IUser";

export const SignUpForm = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarBlob, setAvatarBlob] = useState<PutBlobResult | null>(null);
  const [isNewUserCreated, setIsNewUserCreated] = useState<boolean>(false);
  const [createUser] = useCreateUserMutation();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onFormSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    profiles: [IProfile];
  }) => {
    try {
      if (!avatarBlob) {
        throw new Error("Avatar is required");
      }

      values.avatar = avatarBlob.url;

      await createUser(values).unwrap();
      console.log("User created:", values);
      setIsNewUserCreated(true);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
  const onAvatarClick = () => {
    inputFileRef.current.click();
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        role: "user",
        avatar: "",
        profiles: [],
      }}
      validate={async (values) => {
        const errors: any = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        } else {
          const response = await fetch(
            `${DATABASE_URL}/users/email/${values.email}`,
          );
          if (response.ok) {
            const user = await response.json();
            if (user) {
              errors.email = "Email already in use";
            }
          }
        }

        if (!values.name) {
          errors.name = "Required";
        }

        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6) {
          errors.password = "Password too short";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit(values);
        setSubmitting(false);
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
        setFieldValue,
      }) => (
        <div className="flex items-center justify-center min-h-screen">
          {isNewUserCreated && (
            <div className="absolute bg-black rounded">
              Success!
              <button onClick={() => setIsNewUserCreated(false)}>Ok</button>
            </div>
          )}

          <div className="relative p-8 bg-black rounded-2xl shadow-lg max-w-sm w-full bg-opacity-75">
            <h2 className="text-2xl font-bold text-white text-center">
              Sign up
            </h2>

            <div className="flex justify-center mt-6">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                <div onClick={onAvatarClick} className="cursor-pointer">
                  <img
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : "https://via.placeholder.com/150"
                    }
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="mt-2 text-center text-gray-400">Choose picture</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputFileRef}
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) {
                      onAvatarUpload({ file, setAvatarBlob, setAvatar });
                    }
                  }}
                  className="hidden"
                />
              </div>
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

              <div>
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

              <div>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="w-full px-4 py-2 bg-textWhite text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder={"Nickname"}
                />
                {errors.name && touched.name && errors.name}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="admin"
                  className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700"
                  onChange={(e) => {
                    setFieldValue("role", e.target.checked ? "admin" : "user");
                  }}
                  checked={values.role === "admin"}
                />
                <label htmlFor="admin" className="ml-2 text-gray-400">
                  Admin
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/3 py-2 bg-buttonColor text-white font-bold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 self-center"
              >
                Submit
              </button>
            </form>
            <div className="text-textWhite">
              <Link href={"/signIn"}>Sign in</Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
