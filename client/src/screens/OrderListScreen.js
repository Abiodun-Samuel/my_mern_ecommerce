import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import {
  MY_ORDER_LIST_RESET,
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constant/orderConstants";

const OrderListScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
    return () => {
      // dispatch({ type: ORDER_PAY_RESET });
      // dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: MY_ORDER_LIST_RESET });
      dispatch({ type: ORDER_DETAILS_RESET });
    };
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader fullPage="fullPage" imgHeight="100px" />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <span>ID, User, Date, Total Price, Paid, Delivered</span>
          {orders.map((order) => (
            <div key={order._id}>
              <span>{order._id}</span>
              <span>{order.user && order.user.name}</span>
              <span>{order.createdAt.substring(0, 10)}</span>
              <span>{order.totalPrice}</span>
              <span>
                {order.isPaid ? order.paidAt.substring(0, 10) : "XXX"}
              </span>
              <span>
                {order.isDeliverd ? order.deliveredAt.substring(0, 10) : "XXX"}
              </span>
              <span>
                <Link to={`/order/${order._id}`}>details</Link>
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default OrderListScreen;
