import React, { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  let redirect;
  searchParams.has("redirect")
    ? (redirect = "/" + searchParams.get("redirect"))
    : (redirect = "/");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <h2>Sign In</h2>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader fullPage={true} />}

      <form onSubmit={submitHandler}>
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
        <input type="submit" value="Sign In" className="btn btn-primary" />
      </form>
      <div>
        New Customer
        <Link to="/register">Register</Link>
        {/* <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register
        </Link> */}
      </div>
    </div>
  );
};

export default LoginScreen;
