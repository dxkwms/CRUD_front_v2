import { Field, Formik } from "formik";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { profileValidationSchema } from "@/validation/profileValidationSchema";
import { Avatar } from "@/components/common/Avatar";
import { useAddProfileMutation } from "@/lib/api/usersApi";
import { IProfile } from "@/types/IUser";
import { CommonButton } from "@/components/common/CommonButton";

interface Props {
  userToken: string | undefined;
  setIsCreateNewProfileFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const AddProfileForm = ({
  setIsCreateNewProfileFormVisible,
  userToken,
}: Props) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [addProfile] = useAddProfileMutation();

  const onAddProfile = async (values: IProfile) => {
    if (!userToken) return;
    try {
      await addProfile({ userToken, profile: values }).unwrap();
      alert("Profile added successfully!");
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const onAvatarClick = () => {
    if (!inputFileRef.current) {
      return;
    }

    inputFileRef.current.click();
  };

  const onFormClose = () => {
    setIsCreateNewProfileFormVisible(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phoneNumber: "",
        location: "",
        country: "",
        birthdate: "",
        avatar: "",
        gender: "",
      }}
      onSubmit={onAddProfile}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 flex-col z-10"
        >
          <div className="bg-[#f7f4e9] p-6 rounded-lg w-96 shadow-lg h-5/6">
            <h2 className="text-center text-xl font-semibold">
              Add new profile
            </h2>
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
            <Avatar onAvatarClick={onAvatarClick} avatar={avatar} />
            <Field
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
            <Field
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <Field
              type="text"
              name="location"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
            />
            <Field
              type="text"
              name="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
            />
            <Field
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={values.birthdate}
              onChange={handleChange}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="hidden peer"
                  onChange={(e) => {
                    setFieldValue("gender", e.target.checked && "male");
                  }}
                  checked={values.gender === "male"}
                />
                <label
                  htmlFor="male"
                  className="w-4 h-4 border-2 border-[#D9D9D9] bg-[#D9D9D9] rounded-none cursor-pointer peer-checked:bg-buttonColor peer-checked:border-buttonColor "
                ></label>
                <span
                  className="ml-2 text-gray-400 cursor-pointer"
                  onClick={() => setFieldValue("gender", "male")}
                >
                  Male
                </span>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="hidden peer"
                  onChange={(e) => {
                    setFieldValue("gender", e.target.checked && "female");
                  }}
                  checked={values.gender === "female"}
                />
                <label
                  htmlFor="female"
                  className="w-4 h-4 border-2 border-[#D9D9D9] bg-[#D9D9D9] rounded-none cursor-pointer peer-checked:bg-buttonColor peer-checked:border-buttonColor "
                ></label>
                <span
                  className="ml-2 text-gray-400 cursor-pointer"
                  onClick={() => setFieldValue("gender", "female")}
                >
                  Female
                </span>
              </div>
            </div>

            <div className={"flex justify-between"}>
              <CommonButton>Save</CommonButton>
              <CommonButton clickedFn={onFormClose}>Close</CommonButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
