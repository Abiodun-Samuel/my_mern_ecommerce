import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import {
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineSend,
} from "react-icons/ai";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_SIMILAR_RESET,
} from "../constant/productConstants";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constant/productConstants";
import { formatCurrency, timeFormat, toastMessage } from "../utils/utils";
import SectionHeader from "../components/SectionHeader";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Carousel from "../components/Carousel";
import Product from "../components/Product";
import { sendProductRequestMail } from "../actions/mailActions";
import { MAIL_RESET } from "../constant/mailConstants";

const ProductScreen = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [request, setRequest] = useState("");

  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state) => state.productCreateReview);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: similarProductsLoading,
    similarProducts,
    error: similarProductsError,
  } = useSelector((state) => state.productSimilar);

  const { cartItems } = useSelector((state) => state.cart);
  const {
    response,
    loading: mailLoading,
    error: mailError,
    success: mailSuccess,
  } = useSelector((state) => state.sendProductRequestMail);

  useEffect(() => {
    if (successProductReview) {
      toastMessage("success", "Your review has been added for this product");
      setRating(0);
      setComment("");
    }
    if (errorProductReview) {
      toastMessage("error", errorProductReview);
    }

    dispatch(listProductDetails(slug));

    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch({ type: PRODUCT_SIMILAR_RESET });
    };
  }, [dispatch, slug, successProductReview, errorProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(product.slug, quantity));

    const existItem = cartItems.filter(
      (item) => item.product === product.slug && item.quantity === quantity
    );

    if (existItem.length > 0) {
      toastMessage("error", `${product.name}(${quantity}) exists in your cart`);
    } else {
      toastMessage(
        "success",
        `${product.name}(${quantity}) has been added to your cart`
      );
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(slug, { rating, comment }));
  };
  const increaseQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleRequest = (e) => {
    e.preventDefault();
    dispatch(
      sendProductRequestMail({
        request,
        product: product.name,
        id: product._id,
      })
    );
    toastMessage("success", "Mail has been sent successfully");
    setRequest("");
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-12">
          <SectionHeader header="Product Details" />
        </div>
      </div>
      {loading && <Loader fullPage={true} />}
      {error && toastMessage(error)}
      {product && product?._id && (
        <>
          <div className="row">
            <div className="col-lg-5 col-md-6 my-4">
              <Carousel images={product.images} source="cloudinary" />
            </div>

            <div className="col-lg-7 col-md-6 my-4">
              <div className="productdetails">
                <h3 className="header">{product.name.toUpperCase()}</h3>
                <hr />
                <p className="desc">
                  <b>Description:</b> {product.description}
                </p>
                <hr />
                <p className="price">
                  <b>Price:</b> &#8358;{formatCurrency(product.price)}
                </p>
                <hr />
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} review(s)`}
                />
                <hr />
                <p className="price">
                  <b>Status:</b>
                  {product.countInStock > 0 ? " In Stock " : " Out Of Stock "} (
                  {product.countInStock})
                </p>
                <hr />
                <p className="price d-flex">
                  <b>Quantity:</b>
                  <button
                    className="btn_one mx-3"
                    onClick={() => decreaseQuantity()}
                  >
                    <AiOutlineMinus className="mx-2" />
                  </button>
                  {quantity}
                  <button
                    className="btn_one mx-3"
                    onClick={() => increaseQuantity()}
                  >
                    <AiOutlinePlus className="mx-2" />
                  </button>
                </p>
                <hr />

                <div className="d-flex">
                  <button
                    onClick={() => addToCartHandler()}
                    className="btn_two ml-1 mr-3"
                    type="button"
                  >
                    <HiOutlineShoppingCart className="mr-2" /> Add To Cart
                  </button>
                  <Link className="btn btn_two ml-3" to="/cart">
                    <AiOutlineArrowRight className="mr-2" /> Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="row my-3">
        <div className="col-lg-12">
          <SectionHeader header="Verified Customer Feedback" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 my-3">
          <div className="productreview">
            {product?.reviews?.length === 0 && (
              <Message type="danger" message="No Reviews" />
            )}

            {userInfo ? (
              <>
                <form onSubmit={submitHandler} className="reviews">
                  <div className="form-group mb-3">
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select Rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="form-group my-3">
                    <input
                      type="text"
                      placeholder="Write your review"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button className="btn-block btn_one my-3" type="submit">
                    Comment &#8594;
                  </button>
                </form>
                {loadingProductReview && <Loader smallPage={true} />}
              </>
            ) : (
              <Message type="danger">
                Please <Link to="/login">sign in</Link> to write a review for
                this product
              </Message>
            )}

            {product?.reviews?.map((review) => (
              <div
                className="my-2 px-3 py-2 shadow-sm reviewbox"
                key={review._id}
              >
                <span>
                  <b>{review.name.toUpperCase()}</b>
                </span>
                <span> ({timeFormat(review.createdAt)})</span>
                <Rating value={review.rating} />
                <span>{review.comment}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-8 col-md-6 my-3">
          <div className="product-contact">
            <h4 className="header text-center">Contact Us</h4>
            <p className="desc text-center">
              Need more info about this product? Or you want to make a specific
              request?
            </p>
            {userInfo ? (
              <>
                <form onSubmit={handleRequest}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="my-3"
                      value={request}
                      placeholder="Enter your text here"
                      onChange={(e) => setRequest(e.target.value)}
                    />
                    {/* {mailSuccess &&
                     } */}
                    {mailLoading && <Loader smallPage={true} />}
                    {mailError && <Message type="danger" message={mailError} />}
                    <button
                      type="submit"
                      className="btn_one my-3 px-4 d-flex align-items-center"
                    >
                      <AiOutlineSend className="mr-2" /> Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <Message type="danger">
                Please <Link to="/login">sign in</Link> to make a request
              </Message>
            )}
          </div>
        </div>
      </div>

      {/* similarProducts */}
      <div className="row my-3">
        <div className="col-lg-12">
          <SectionHeader header="Similar Products" />
        </div>
      </div>

      {similarProductsLoading && <Loader fullPage={true} />}
      {similarProductsError && toastMessage(similarProductsError)}
      {similarProducts?.length > 0 && (
        <div className="row my-2">
          {similarProducts.map((product) => {
            return (
              <div
                className="col-lg-2 col-md-4 col-sm-6 col-6 my-2"
                key={product._id}
              >
                <Product product={product} />
              </div>
            );
          })}
        </div>
      )}
      {}
    </>
  );
};

export default ProductScreen;
