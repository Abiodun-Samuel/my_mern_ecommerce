import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const quantity = 1;

  const addToCartHandler = () => {
    console.log("object");
    // dispatch(addToCart(product._id, quantity));
    // const existItem = cartItems.filter(
    //   (item) => item.product === product._id && item.quantity === quantity
    // );
    // if (existItem.length > 0) {
    //   toast.error(
    //     <div>
    //       <span className="toastify">
    //         {product.name + " (" + quantity + ") "}
    //       </span>
    //       already exist in your cart
    //     </div>
    //   );
    // } else {
    //   toast.success(
    //     <div>
    //       <span className="toastify">
    //         {product.name + " (" + quantity + ") "}
    //       </span>
    //       has been added to your cart
    //     </div>
    //   );
    // }
  };

  return (
    <>
      <Link to={`/product/${product._id}`}>
        <div className="card my-2 rounded border-0 shadow-sm bg-white">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <div className="card-text">
              <Rating value={product.rating} />
            </div>
            <p>${product.price}</p>
            {/* <button onClick={addToCartHandler}>Cart</button> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
