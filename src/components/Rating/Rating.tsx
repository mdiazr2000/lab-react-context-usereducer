import React from "react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface RatingProps {
  rating: number;
  onClick?: (i: number) => any;
  style?: Object;
}

const Rating: React.FC<RatingProps> = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span key={i} onClick={() => onClick && onClick(i)} style={style}>
          {i <= rating ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
