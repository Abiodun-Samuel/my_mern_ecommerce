import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

const PlaceorderSreen = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const count = "9";
  console.log([...Array(Number(count)).keys()]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <h2>Shipping</h2>
      <p>
        <strong>Address:</strong>
        {cart.shippingAddress.address}, {cart.shippingAddress.city}
        {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
      </p>
      <h4>Payment Method: {cart.paymentMethod}</h4>
    </div>
  );
};

export default PlaceorderSreen;
