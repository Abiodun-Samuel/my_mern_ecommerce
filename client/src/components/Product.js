import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi";

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
      <div className="card my-2 rounded border-0 shadow-sm bg-white">
        <div className="discount_percentage">
          <p>{discountPercentage(product.inflatedPrice, product.price)}</p>
        </div>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h6 className="card-title">{product.name}</h6>
          </Link>

          <div className="discount_price d-flex justify-content-between">
            <p>&#8358; {product.price}</p>
            <p>&#8358; {product.inflatedPrice}</p>
          </div>

          <div className="card-text">
            <Rating value={product.rating} />
          </div>
          <button
            className="shadow"
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
          >
            <HiOutlineShoppingCart className="mx-2" />
            Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
