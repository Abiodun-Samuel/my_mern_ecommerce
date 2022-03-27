import swal from "@sweetalert/with-react";
import { toast } from "react-toastify";
import moment from "moment";

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

export const formatCurrency = (amount) => {
  if (amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
};

export const toastMessage = (type, message) => {
  if (type === "error") {
    toast.error(
      <div>
        <span className="toastify">{message}</span>
      </div>
    );
  }
  if (type === "warning") {
    toast.warning(
      <div>
        <span className="toastify">{message}</span>
      </div>
    );
  }
  if (type === "success") {
    toast.success(
      <div>
        <span className="toastify">{message}</span>
      </div>
    );
  }
};

export const timeFormat = (time) => {
  if (time) {
    return moment(time).fromNow();
  }
};
