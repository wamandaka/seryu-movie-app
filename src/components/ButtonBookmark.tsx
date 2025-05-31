import React from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

interface ButtonBookmarkProps {
  handleBookmark: React.MouseEventHandler<HTMLButtonElement>;
  isBookmarked: boolean;
}

const ButtonBookmark: React.FC<ButtonBookmarkProps> = ({
  handleBookmark,
  isBookmarked,
}) => {
  return (
    <div>
      <button onClick={handleBookmark} className="cursor-pointer">
        {isBookmarked ? (
          <IoBookmark size={30} />
        ) : (
          <IoBookmarkOutline size={30} />
        )}
      </button>
    </div>
  );
};

export default ButtonBookmark;
