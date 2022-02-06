import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const ShippingScreen = () => {
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
  return <div>shipping</div>;
};

export default ShippingScreen;
