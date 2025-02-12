import { PutBlobResult } from "@vercel/blob";
import { Dispatch, SetStateAction } from "react";

interface Props {
  file: File;
  setAvatarBlob: Dispatch<SetStateAction<PutBlobResult | null>>;
  setAvatar: Dispatch<SetStateAction<File | null>>;
}

export const onAvatarUpload = async ({
  setAvatarBlob,
  setAvatar,
  file,
}: Props) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
    method: "POST",
    body: file,
  });

  if (response.ok) {
    const newBlob = (await response.json()) as PutBlobResult;
    setAvatarBlob(newBlob);
    setAvatar(file);
  } else {
    throw new Error("Failed to upload avatar");
  }
};
