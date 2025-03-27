import { IUser } from "@/types/IUser";
import { Dispatch, SetStateAction, useRef } from "react";
import { useOutsideDetect } from "@/hooks/common/useOutsideDetect";
import { FormWrapper } from "@/common/FormWrapper";
import { Form, Formik } from "formik";
import { Typography } from "@/components/common/Typography";
import { ProfileField } from "@/components/common/ProfileField";
import { Avatar } from "@/components/common/Avatar";
import { CommonButton } from "@/components/common/CommonButton";
import { AdminCheckboxField } from "@/components/common/AdminCheckboxField";

interface IProps {
  userData: IUser;
  updateUserError: string;
  onUserEdit: (values: IUser) => void;
  setIsUserEditOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditUserForm = ({
  onUserEdit,
  userData,
  setIsUserEditOpen,
  updateUserError,
}: IProps) => {
  const wrapperRef = useRef(null);
  useOutsideDetect({
    ref: wrapperRef,
    setIsListOpen: setIsUserEditOpen,
  });

  return (
    <FormWrapper>
      <Formik
        initialValues={{
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar,
        }}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          onUserEdit(values);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form
            ref={wrapperRef}
            className="bg-[#F2EDE7] p-6 rounded-xl shadow-lg w-96 text-formBackground"
            onSubmit={handleSubmit}
          >
            <Typography variant={"h2"} className={"justify-center flex"}>
              Edit user
            </Typography>
            <Avatar
              avatar={values.avatar}
              setAvatar={(file) => setFieldValue("avatar", file)}
            />
            {updateUserError}
            <ProfileField
              type={"name"}
              value={values.name}
              name="name"
              placeholder={values.name}
              onChange={handleChange}
            />
            <ProfileField
              type={"email"}
              value={values.email}
              placeholder={values.email}
              name="email"
              onChange={handleChange}
            />
            <AdminCheckboxField
              setFieldValue={setFieldValue}
              role={values.role}
            />
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
                clickedFn={() => setIsUserEditOpen(false)}
              >
                Close
              </CommonButton>
            </div>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};
