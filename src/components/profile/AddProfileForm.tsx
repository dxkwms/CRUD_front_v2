import { Formik } from "formik";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { profileValidationSchema } from "@/validation/profileValidationSchema";
import { Avatar } from "@/components/common/Avatar";
import { useAddProfileMutation } from "@/lib/api/usersApi";

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

  const onAddProfile = async (values) => {
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
      validationSchema={profileValidationSchema}
      onSubmit={onAddProfile}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex justify-center mt-6">
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
          </div>

          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={values.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className={"flex"}>
            <div>
              <input
                type="radio"
                id="male"
                className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700"
                onChange={(e) => {
                  setFieldValue("gender", e.target.checked && "male");
                }}
                checked={values.gender === "male"}
              />
              <label htmlFor="male" className="ml-2 text-gray-400">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="femail"
                className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700"
                onChange={(e) => {
                  setFieldValue("gender", e.target.checked && "femail");
                }}
                checked={values.gender === "femail"}
              />
              <label htmlFor="femail" className="ml-2 text-gray-400">
                Female
              </label>
            </div>
          </div>
          <button type="submit">Add Profile</button>
          <button onClick={() => setIsCreateNewProfileFormVisible(false)}>
            Cancel
          </button>
        </form>
      )}
    </Formik>
  );
};
