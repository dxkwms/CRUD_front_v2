import { Formik } from "formik";
import { Dispatch, SetStateAction, useRef } from "react";
import { Avatar } from "@/components/common/Avatar";
import { IProfile } from "@/types/IUser";
import { CommonButton } from "@/components/common/CommonButton";
import { ProfileField } from "@/components/common/ProfileField";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";
import { GenderCheckbox } from "@/components/common/GenderCheckbox";
import { GENDERS } from "@/types/gengersEnum";

interface Props {
  avatar: File | null;
  formName: string;
  nameValue: string;
  phoneNumberValue: string;
  locationValue: string;
  countryValue: string;
  birthdateValue: string;
  avatarValue: string;
  genderValue: string;

  profileFunction: (
    values: IProfile,
    setFieldError: (field: string, message?: string) => void,
  ) => void;

  onEditCancel?: () => void;

  setAvatar: Dispatch<SetStateAction<File | null>>;
  setIsCreateNewProfileFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const AddOrEditProfileForm = ({
  setIsCreateNewProfileFormVisible,
  formName,
  nameValue,
  phoneNumberValue,
  locationValue,
  countryValue,
  birthdateValue,
  avatarValue,
  genderValue,
  profileFunction,
  setAvatar,
  avatar,
  onEditCancel,
}: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setIsListOpen: setIsCreateNewProfileFormVisible,
  });

  const onAvatarClick = () => {
    if (!inputFileRef.current) {
      return;
    }

    inputFileRef.current.click();
  };

  const onFormClose = () => {
    if (onEditCancel) {
      onEditCancel();
    }
    setIsCreateNewProfileFormVisible(false);
  };

  return (
    <Formik
      initialValues={{
        name: nameValue,
        phoneNumber: phoneNumberValue,
        location: locationValue,
        country: countryValue,
        birthdate: birthdateValue,
        avatar: avatarValue,
        gender: genderValue,
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        profileFunction(values, setFieldError);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 flex items-center justify-center bg-formBackground bg-opacity-50 flex-col z-10"
        >
          <div
            className="bg-[#f7f4e9] p-6 rounded-lg w-96 shadow-lg"
            ref={wrapperRef}
          >
            <h2 className="text-center text-xl font-semibold">{formName}</h2>
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
            <ProfileField
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
            <ProfileField
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <ProfileField
              type="text"
              name="location"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
            />
            <ProfileField
              type="text"
              name="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
            />
            <ProfileField
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={values.birthdate}
              onChange={handleChange}
            />
            <div className="flex justify-center items-center mt-2">
              <GenderCheckbox
                id={GENDERS.MALE}
                value={GENDERS.MALE}
                setFieldValue={setFieldValue}
                label={"Male"}
                selectedValue={values.gender}
              />
              <GenderCheckbox
                id={GENDERS.FEMALE}
                value={GENDERS.FEMALE}
                setFieldValue={setFieldValue}
                label={"Female"}
                selectedValue={values.gender}
              />
            </div>

            <div className={"flex justify-between mt-2"}>
              <CommonButton
                width={"1/3"}
                color={"editButtonColor"}
                hoverColor={"[#7cc47a]"}
              >
                Save
              </CommonButton>
              <CommonButton
                width={"1/3"}
                color={"buttonColor"}
                hoverColor={"red-800"}
                clickedFn={onFormClose}
              >
                Close
              </CommonButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
