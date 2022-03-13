import axios from "axios";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
} from "../constant/categoryConstants";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`/api/category`);
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error,
    });
  }
};
