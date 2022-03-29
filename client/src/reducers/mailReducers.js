import {
  MAIL_FAIL,
  MAIL_REQUEST,
  MAIL_RESET,
  MAIL_SUCCESS,
} from "../constant/mailConstants";

// ;
export const sendProductRequestMailReducer = (
  state = { response: null, success: false },
  action
) => {
  switch (action.type) {
    case MAIL_REQUEST:
      return { loading: true, success: false };
    case MAIL_SUCCESS:
      return { loading: false, success: true, response: action.payload };
    case MAIL_FAIL:
      return { loading: false, error: action.payload, success: false };
    case MAIL_RESET:
      return { response: null, success: false };
    default:
      return state;
  }
};
