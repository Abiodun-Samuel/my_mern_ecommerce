import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
} from "../constant/userConstants";
import { myOrdersList } from "../actions/orderActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrders = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders;
  console.log(orders);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name || !user || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(myOrdersList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, navigate, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div>
      <h2>User Profile</h2>

      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">'Profile Updated'</Message>}
      {loading && <Loader></Loader>}

      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm Password"
          value={confirmPassword}
          className="form-control"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" value="Update" className="btn btn-primary" />
      </form>

      {/* {My orders section } */}
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <>
          <span>Order Details: id, date, total, paid, delivered</span>
          {orders.map((order) => (
            <div key={order._id}>
              {order._id}, {order.createdAt.substring(0, 10)},{order.totalPrice}
              ,{order.isPaid ? order.paidAt.substring(0, 10) : <span>XXX</span>}
              {order.isDelivered ? (
                order.deliveredAt.substring(0, 10)
              ) : (
                <span>XXX</span>
              )}
              <Link to={`/order/${order._id}`}>Details</Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
