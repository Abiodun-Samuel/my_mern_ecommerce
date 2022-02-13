import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_PAYMENT_METHOD_CART,
  SAVE_SHIPPING_ADDRESS_CART,
} from "../constant/cartConstants";
import "react-toastify/dist/ReactToastify.css";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case SAVE_SHIPPING_ADDRESS_CART:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SAVE_PAYMENT_METHOD_CART:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
