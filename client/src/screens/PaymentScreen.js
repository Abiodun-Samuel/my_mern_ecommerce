import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let redirect;
  searchParams.has("redirect")
    ? (redirect = "/" + searchParams.get("redirect"))
    : (redirect = "/");
  useEffect(() => {
    if (!userInfo) {
      navigate(redirect, { replace: true });
    }
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [userInfo, navigate, redirect, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="PayPal">PayPal</label>
        <input
          type="radio"
          id="PayPal"
          value="PayPal"
          name="paymentMethod"
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        {/* another method */}
        {/* <label htmlFor="PayPal"></label>
        <input
          type="radio"
          id="PayPal"
          value="PayPal"
          name="paymentMethod"
          checked
          onChange={(e) => setPaymentMethod(e.target.value)}
        /> */}
        <button type="submit">Continue</button>
      </form>
    </>
  );
};

export default PaymentScreen;
