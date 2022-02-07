import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let redirect;
  searchParams.has("redirect")
    ? (redirect = "/" + searchParams.get("redirect"))
    : (redirect = "/");
  useEffect(() => {
    if (!userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [userInfo, navigate, redirect]);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={address}
          placeholder="Enter your address"
          className="form-control"
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          value={city}
          placeholder="Enter your city"
          className="form-control"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          className="form-control"
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Country"
          value={country}
          className="form-control"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Continue</button>
        {/* <input type="submit" value="Sign Up" className="btn btn-primary" /> */}
      </form>
    </>
  );
};

export default ShippingScreen;
