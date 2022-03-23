import swal from "@sweetalert/with-react";

export const customSweetAlert = (title, text, icon, btn_text, onSuccess) => {
  swal(title, text, icon, {
    button: "close",
    content: (
      <div className="d-flex justify-content-center">
        <button className="btn_one" onClick={onSuccess}>
          {btn_text}
        </button>
      </div>
    ),
  });
};

