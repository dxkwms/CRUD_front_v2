import { Formik } from "formik";
import { Dispatch, SetStateAction, useRef } from "react";
import { Avatar } from "@/components/common/Avatar";
import { IProfile } from "@/types/IUser";
import { CommonButton } from "@/components/common/CommonButton";
import { ProfileField } from "@/components/common/ProfileField";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";
import { GenderCheckbox } from "@/components/common/GenderCheckbox";
import { GENDERS } from "@/types/gengersEnum";
import { Typography } from "@/components/common/Typography";
import { FormWrapper } from "@/common/FormWrapper";

interface Props {
  avatar?: File | null;
  formName?: string;
  nameValue?: string;
  phoneNumberValue?: string;
  locationValue?: string;
  countryValue?: string;
  birthdateValue?: string;
  avatarValue?: string;
  genderValue?: string;

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
  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setIsListOpen: setIsCreateNewProfileFormVisible,
  });

  const onFormClose = () => {
    if (onEditCancel) {
      onEditCancel();
    }
    setIsCreateNewProfileFormVisible(false);
  };

  return (
    <Formik
      initialValues={{
        name: nameValue || "",
        phoneNumber: phoneNumberValue || "",
        location: locationValue || "",
        country: countryValue || "",
        birthdate: birthdateValue || "",
        avatar: avatarValue || "",
        gender: genderValue || "male",
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        profileFunction(values, setFieldError);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <div
              className="bg-[#f7f4e9] p-6 rounded-lg w-96 shadow-lg"
              ref={wrapperRef}
            >
              <Typography
                variant={"h2"}
                className="text-center text-xl font-semibold"
              >
                {formName}
              </Typography>

              <Avatar avatar={avatar} setAvatar={setAvatar} />
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
                  className={"w-1/3"}
                  variant={"apply"}
                  type={"submit"}
                >
                  Save
                </CommonButton>
                <CommonButton
                  type={"submit"}
                  className={"w-1/3"}
                  variant={"cancel"}
                  clickedFn={onFormClose}
                >
                  Close
                </CommonButton>
              </div>
            </div>
          </form>
        </FormWrapper>
      )}
    </Formik>
  );
};
