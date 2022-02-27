import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [searchParams] = useSearchParams();
  let redirect;
  searchParams.has("redirect")
    ? (redirect = "/" + searchParams.get("redirect"))
    : (redirect = "/");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
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
        <input type="submit" value="Sign Up" className="btn btn-primary" />
      </form>

      <div>
        Have an account?
        <Link to="/login">Login</Link>
        {/* <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
          Login
        </Link> */}
      </div>
    </div>
  );
};

export default RegisterScreen;
