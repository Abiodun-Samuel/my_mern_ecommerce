import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const deleteHandler = () => {};

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
                <Link to={`/user/${user._id}/edit`}>Edit</Link>
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
