import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constant/orderConstants";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // calculate price
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/clientId");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order Id: {order._id}</h1>
      <h3>Shipping</h3>
      <p>
        <b>Name:</b>
        {order.user.name}
      </p>
      <p>
        <b>Email:</b>
        {order.user.email}
      </p>
      <p>
        <strong>Address:</strong>
        {order.shippingAddress.address}, {order.shippingAddress.city}
        {order.shippingAddress.postalCode},{order.shippingAddress.country}
      </p>
      {order.isDelivered ? (
        <Message variant="success"> Paid on {order.deliveredAt}</Message>
      ) : (
        <Message variant="danger">Not Delivered</Message>
      )}
      <h4>Payment Method: {order.paymentMethod}</h4>
      {/* <p> */}
      {order.isPaid ? (
        <Message variant="success"> Paid on {order.paidAt}</Message>
      ) : (
        <Message variant="danger">Not Paid</Message>
      )}
      {/* </p> */}

      <h2>Order Items</h2>
      {order.orderItems.length === 0 ? (
        <Message>Your order is empty</Message>
      ) : (
        <ul>
          {order.orderItems.map((item, index) => (
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
        <p>Items &#8358;{order.itemsPrice}</p>
        <h2>Shipping</h2>
        <p> &#8358;{order.shippingPrice}</p>
        <h2>Tax </h2>
        <p> &#8358;{order.taxPrice}</p>
        <h2>Total</h2>
        <p> &#8358;{order.totalPrice}</p>
      </Card>
      {!order.isPaid && (
        <li>
          {loadingPay && <loader />}
          {!sdkReady ? (
            <Loader />
          ) : (
            <PayPalButton
              amount={order.totalPrice}
              onsuccess={successPaymentHandler}
            />
          )}
        </li>
      )}
      {loadingDeliver && <Loader />}
      {userInfo && userInfo.isAdmin && !order.isDelivered && (
        <button onClick={deliverHandler}>Mark As Delivered</button>
      )}
    </>
  );
};

export default OrderScreen;
