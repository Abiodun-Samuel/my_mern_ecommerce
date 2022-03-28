import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaListOl } from "react-icons/fa";
import { Image } from "cloudinary-react";
import { formatCurrency } from "../utils/utils";

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
        className="card my-3 rounded border-0 bg-white"
        id="product_component"
      >
        <div className="discount_percentage">
          <p>{discountPercentage(product.inflatedPrice, product.price)}</p>
        </div>
        <Link to={`/product/${product.slug}`}>
          <Image
            cloudName="psalmzie"
            publicId={product.image}
            width="auto"
            height="150"
            // crop="scale"
            alt={product.name}
            className="img-fluid"
          />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product.slug}`}>
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
              <p className="price">&#8358; {formatCurrency(product.price)}</p>
              <p className="inflatedprice">
                &#8358; {formatCurrency(product.inflatedPrice)}
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
