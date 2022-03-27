import React from "react";

const Message = ({ type = "", message = "", children }) => {
  return (
    <>
      <div className={`alert alert-${type}`} role="alert">
        {message && <p className="py-0 my-0 font-weight-bold">{message}</p>}
        {children && <p className="py-0 my-0 font-weight-bold">{children}</p>}
      </div>
    </>
  );
};
// Message.defaultProps = {
//   variant: "info",
// };
export default Message;
