import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constant/userConstants";
import Message from "../components/Message";
import Loader from "../components/Loader";

const UserEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  console.log(user);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/users");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [
    successUpdate,
    dispatch,
    id,
    user.name,
    user.email,
    user.isAdmin,
    user._id,
    navigate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <div>
      <Link className="btn btn-primary" to="/admin/users">
        Go Back
      </Link>
      <h2>Update User</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            className=""
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <input type="submit" value="Update" className="btn btn-primary" />
        </form>
      )}

      <div></div>
    </div>
  );
};

export default UserEditScreen;
