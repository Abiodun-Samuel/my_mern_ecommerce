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
  const dispatch = useDispatch();
  const [publickey, setPublickey] = useState("");
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = useSelector((state) => state.orderDeliver);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

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

  (async function addPaypalScript() {
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
  })();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order) {
      dispatch({ type: ORDER_DETAILS_RESET });
      dispatch(getOrderDetails(orderId));
    }
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    order,
    orderId,
    navigate,
    userInfo,
    successPay,
    successDeliver,
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
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader fullPage="fullPage" imgHeight="80px" />
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
          {loadingPay && <Loader fullPage="fullPage" imgHeight="80px" />}
          {userInfo && order && !order.isPaid && (
            <PaystackButton className="paystack-button" {...componentProps} />
          )}
          {/* {!publickey ? (
            <Loader />
          ) : (
            <PaystackButton className="paystack-button" {...componentProps} />
          )} */}
        </li>
      )}
      {loadingDeliver && <Loader smallPage="smallPage" imgHeight="40px" />}
      {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
        <button onClick={deliverHandler}>Mark As Delivered</button>
      )}
    </>
  );
};

export default OrderScreen;
