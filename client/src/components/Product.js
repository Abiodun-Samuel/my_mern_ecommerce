import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaListOl } from "react-icons/fa";

const Product = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const quantity = 1;

  const discountPercentage = (inflatedPrice, price) => {
    let value = ((inflatedPrice - price) / inflatedPrice) * 100;
    return Math.round(value) <= 0.5
      ? `0${Math.round(value)}%`
      : Math.round(value) < 10
      ? `-0${Math.round(value)}%`
      : `-${Math.round(value)}%`;
  };

  const formatProductName = (name) => {
    if (name.length < 16) {
      return `${name.substring(0, 16).toUpperCase()}`;
    } else {
      return `${name.substring(0, 16).toUpperCase()}...`;
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
    const existItem = cartItems.filter(
      (item) => item.product === product._id && item.quantity === quantity
    );
    if (existItem.length > 0) {
      toast.error(
        <div>
          <span className="toastify">
            {product.name + " (" + quantity + ") "}
          </span>
          already exist in your cart
        </div>
      );
    } else {
      toast.success(
        <div>
          <span className="toastify">
            {product.name + " (" + quantity + ") "}
          </span>
          has been added to your cart
        </div>
      );
    }
  };

  return (
    <>
      <div
        className="card my-2 rounded border-0 bg-white"
        id="product_component"
      >
        <div className="discount_percentage">
          <p>{discountPercentage(product.inflatedPrice, product.price)}</p>
        </div>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            height="150px"
            width="auto"
          />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h6 className="card-title product_name">
              {formatProductName(product.name)}
            </h6>
          </Link>

          <div className="discount d-flex justify-content-between my-1">
            <button className="wish_btn" onClick={addToCartHandler}>
              <span>
                <FaListOl />
              </span>
            </button>

            <div>
              <p className="price">
                &#8358;
                {product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>
              <p className="inflatedprice">
                &#8358;
                {product.inflatedPrice
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </p>
            </div>
          </div>

          <div className="mt-1 mb-2">
            <Rating value={product.rating} />
          </div>
          <button
            className="shadow btn-block product_btn"
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
          >
            <span className="d-flex align-items-center justify-content-center">
              <HiOutlineShoppingCart className="mr-2" />
              Cart
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
