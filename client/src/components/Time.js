import React from "react";
import moment from "moment";

const Time = ({ time }) => {
  let display = moment(time).utc(time).format("DD MMM YYYY hh:mm:ssa");
  return <b>{display}</b>;
};

export default Time;
