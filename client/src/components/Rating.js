import React from "react";
import PropTypes from "prop-types";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span style={{ color: color }}>
        {value >= 1 ? (
          <IoIosStar />
        ) : value >= 0.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span style={{ color: color }}>
        {value >= 2 ? (
          <IoIosStar />
        ) : value >= 1.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span style={{ color: color }}>
        {value >= 3 ? (
          <IoIosStar />
        ) : value >= 2.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span style={{ color: color }}>
        {value >= 4 ? (
          <IoIosStar />
        ) : value >= 3.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <span style={{ color }}>
        {value >= 5 ? (
          <IoIosStar />
        ) : value >= 4.5 ? (
          <IoIosStarHalf />
        ) : (
          <IoIosStarOutline />
        )}
      </span>
      <br />
      {text && <span>{text}</span>}
    </div>
  );
};
Rating.defaultProps = {
  color: "#E4811C",
};
Rating.propTypes = {
  // value: PropTypes.number.isRequired,
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
