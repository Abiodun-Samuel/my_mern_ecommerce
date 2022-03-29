import axios from "axios";
import {
  MAIL_FAIL,
  MAIL_REQUEST,
  MAIL_SUCCESS,
} from "../constant/mailConstants";

export const sendProductRequestMail =
  (request_body) => async (dispatch, getState) => {
    try {
      dispatch({ type: MAIL_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/send_mail/product_request`,
        request_body,
        config
      );
      dispatch({ type: MAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
