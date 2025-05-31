import React from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
interface ButtonFavoriteProps {
  handleFavorite: React.MouseEventHandler<HTMLButtonElement>;
  isFavorited: boolean;
}
const ButtonFavorite: React.FC<ButtonFavoriteProps> = ({
  handleFavorite,
  isFavorited,
}) => {
  return (
    <div>
      <button onClick={handleFavorite} className="cursor-pointer">
        {isFavorited ? <IoHeart size={30} /> : <IoHeartOutline size={30} />}
      </button>
    </div>
  );
};

export default ButtonFavorite;
