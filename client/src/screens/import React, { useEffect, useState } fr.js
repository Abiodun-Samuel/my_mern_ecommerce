import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Time from "../components/Time";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
} from "../constant/orderConstants";
import axios from "axios";
import { PaystackButton } from "react-paystack";

const OrderScreen = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [publickey, setPublickey] = useState("");

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order);

  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // calculate price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (!loading) {
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
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data: clientId } = await axios.get(
        "/api/payment/paystack_public_key",
        config
      );
      setPublickey(clientId);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_DETAILS_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      addPaypalScript();
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDeliver,
    navigate,
    userInfo,
  ]);

  const componentProps = {
    email: userInfo.email,
    amount: addDecimals(order?.totalPrice * 100),
    name: userInfo.name,
    phone: userInfo.name,
    publicKey: publickey,
    text: "Buy Now",
    onSuccess: (reference) => {
      dispatch(payOrder(orderId, reference));
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  const deliverHandler = () => {
    dispatch({ type: ORDER_DELIVER_RESET });
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader fullPage="fullPage" imgHeight="100px" />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order Id: {order._id}</h1>
      <h3>Shipping</h3>
      <p>
        <b>Name:</b>
        {order?.user?.name}
      </p>
      <p>
        <b>Email:</b>
        {order?.user?.email}
      </p>
      <p>
        <strong>Address:</strong>
        {order?.shippingAddress?.address}, {order?.shippingAddress?.city}
        {order?.shippingAddress?.postalCode},{order?.shippingAddress?.country}
      </p>
      {order.isDelivered ? (
        <Message variant="success">
          Delivered on: {<Time time={order.deliveredAt} />}
        </Message>
      ) : (
        <Message variant="danger">Not Delivered</Message>
      )}
      <h4>Payment Method: {order.paymentMethod}</h4>
      {order.isPaid ? (
        <Message variant="success">
          Paid on: {<Time time={order.paidAt} />}
        </Message>
      ) : (
        <Message variant="danger">Not Paid</Message>
      )}

      <h2>Order Items</h2>
      {order?.orderItems?.length === 0 ? (
        <Message>Your order is empty</Message>
      ) : (
        <ul>
          {order?.orderItems?.map((item, index) => (
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
          {loadingPay && <Loader />}
          {!publickey ? (
            <Loader />
          ) : (
            <PaystackButton className="paystack-button" {...componentProps} />
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
