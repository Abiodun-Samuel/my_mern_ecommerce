import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
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
} from "react-icons/ai";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { toast } from "react-toastify";
import { PRODUCT_DETAILS_RESET } from "../constant/productConstants";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constant/productConstants";
import PageHeader from "../components/PageHeader";
import { formatCurrency } from "../utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SectionHeader from "../components/SectionHeader";
import { HiOutlineShoppingCart } from "react-icons/hi";

const ProductScreen = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state) => state.productCreateReview);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(slug));
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    };
  }, [dispatch, slug, successProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(product.slug, quantity));
    const existItem = cartItems.filter(
      (item) => item.product === product.slug && item.quantity === quantity
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
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(slug, { rating, comment }));
  };
  const increaseQuantity = () => {
    // () => setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    // () => setQuantity(quantity + 1);
  };
  return (
    <>
      {loading ? (
        <Loader fullPage={true} />
      ) : error ? (
        <div className="row my-1">
          <div className="col-lg-12">
            <Message variant="danger">{error}</Message>
          </div>
        </div>
      ) : (
        <>
          <div className="row mt-5 mb-2 bg-white">
            <div className="col-lg-5 col-md-6 my-2">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#c94f74",
                  "--swiper-pagination-color": "#c94f74",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {product?.images?.map((x, index) => (
                  <SwiperSlide key={x + index}>
                    <Image
                      cloudName="psalmzie"
                      publicId={x}
                      alt={x}
                      width="500"
                      height="500"
                      className="img-fluid shadow-sm rounded"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {product?.images?.map((x, index) => (
                  <SwiperSlide key={x + index}>
                    <Image
                      cloudName="psalmzie"
                      publicId={x}
                      alt={x}
                      className="img-fluid shadow-sm rounded"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="col-lg-7 col-md-6 my-2">
              <div className="productdetails">
                <h3 className="header">{product.name}</h3>
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
                  {product.countInStock > 0 ? " In Stock" : " Out Of Stock"}
                </p>
                <hr />
                <p className="price d-flex">
                  <b>Quantity:</b>
                  <button className="btn_one mx-3" onClick={decreaseQuantity}>
                    <AiOutlineMinus className="mx-1" />
                  </button>
                  {quantity}
                  <button className="btn_one mx-3" onClick={increaseQuantity}>
                    <AiOutlinePlus className="mx-1" />
                  </button>
                  {product.countInStock > 0 && (
                    <>
                      {/* <select
                        className="select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select> */}
                    </>
                  )}
                </p>
                <hr />

                <div className="d-flex">
                  <button
                    onClick={addToCartHandler}
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

      <div className="row my-4">
        <div className="col-lg-12">
          <SectionHeader header="Reviews" />
        </div>
      </div>

      {/* <div className="row my-2">
            <h3>Reviews</h3>
            {product?.reviews?.length === 0 && <Message>No Reviews</Message>}
            <ul>
              {product?.reviews?.map((review) => (
                <li key={review._id}>
                  <span>{review.name}</span>
                  <Rating value={review.rating} />
                  <span>{review.createdAt.substring(0, 10)}</span>
                  <span>{review.comment}</span>
                </li>
              ))}
            </ul>
            <ul>
              <span>Write a customer review</span>
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {loadingProductReview && <Loader />}
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="">Select...</option>
                    <option value="">Select...</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit">Comment</button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ul>
          </div> */}
    </>
  );
};

export default ProductScreen;
