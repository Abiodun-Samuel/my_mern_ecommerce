import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div>
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "50px",
            height: "50px",
            margin: 'auto',
            display: "block",
          }}
        ></Spinner>
        <span className="text-primary my-2">Loading...</span>
      </div>
    </div>
  );
};
export default Loader;
