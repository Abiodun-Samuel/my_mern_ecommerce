import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";

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
  }, [dispatch, userInfo, navigate]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
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
