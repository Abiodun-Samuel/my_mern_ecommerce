import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        // width: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.2)",
        // right: "100px",
      }}
    >
      <div>
        <Spinner
          animation="border"
          role="status"
          style={{
            maxwidth: "100px",
            maxheight: "100px",
            margin: "auto",
            display: "block",
          }}
        ></Spinner>
        <span className="text-primary my-2">Loading...</span>
      </div>
    </div>
  );
};
export default Loader;
