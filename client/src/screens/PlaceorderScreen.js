import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

const PlaceorderSreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // calculate price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const navigate = useNavigate();


  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
      })
    );
    navigate(`/orderlist`);
  };

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

      <h2>Order Items</h2>
      {cart.cartItems.length === 0 ? (
        <Message>Your cart is empty</Message>
      ) : (
        <ul>
          {cart.cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.name} />
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              {item.quantity} x ${item.price} = ${item.quantity * item.price}
            </li>
          ))}
        </ul>
      )}

      <Card>
        <h2>Order Summary</h2>
        <p>Items &#8358;{cart.itemsPrice}</p>
        <h2>Shipping</h2>
        <p> &#8358;{cart.shippingPrice}</p>
        <h2>Tax </h2>
        <p> &#8358;{cart.taxPrice}</p>
        <h2>Total</h2>
        <p> &#8358;{cart.totalPrice}</p>
      </Card>
      {error && <Message variant="danger">{error}</Message>}
      <button
        type="button"
        className="btn"
        disabled={cart.cartItems === 0}
        onClick={placeOrderHandler}
      >
        Place order
      </button>
    </div>
  );
};

export default PlaceorderSreen;
