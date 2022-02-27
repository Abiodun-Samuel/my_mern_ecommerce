import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Delete?")) dispatch(deleteUser(id));
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <span>ID, Name, Email, Admin</span>
          {users.map((user) => (
            <div key={user._id}>
              <span>{user._id}</span>
              <span>{user.name}</span>
              <span>
                <Link to={`mailto:${user.email}`}>{user.email}</Link>
              </span>
              <span>{user.isAdmin ? "Admin" : "User"}</span>
              <span>
                <Link to={`/admin/user/${user._id}/edit`}>Edit</Link>
              </span>
              <span>
                <button onClick={() => deleteHandler(user._id)}>Delete</button>
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default UserListScreen;
