interface Props {
  onAvatarClick: () => void;

  avatar: File | null;
}

export const Avatar = ({ onAvatarClick, avatar }: Props) => {
  return (
    <div className="flex justify-center mt-6">
      <div
        onClick={onAvatarClick}
        className="cursor-pointer w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden"
      >
        <div className="cursor-pointer">
          <img
            src={
              avatar ? URL.createObjectURL(avatar) : "/img/defaultAvatar.png"
            }
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
