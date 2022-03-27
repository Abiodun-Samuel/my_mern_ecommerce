import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
  productsListByCategory,
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
import { formatCurrency, timeFormat, toastMessage } from "../utils/utils";
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

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  
  if (product) {
    dispatch(productsListByCategory(product.category_slug));
  }

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (successProductReview) {
      toastMessage("success", "Your review has been added for this product");
      setRating(0);
      setComment("");
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
  console.log(errorProductReview);
  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-12">
          <SectionHeader header="Product Details" />
        </div>
      </div>

      {loading && <Loader fullPage={true} />}
      {error && toastMessage(error)}
      {product && (
        <>
          <div className="row my-4 mb-2 bg-white">
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
                  {product.countInStock > 0 ? " In Stock " : " Out Of Stock "} (
                  {product.countInStock})
                </p>
                <hr />
                <p className="price d-flex">
                  <b>Quantity:</b>
                  <button className="btn_one mx-3" onClick={decreaseQuantity}>
                    <AiOutlineMinus className="mx-2" />
                  </button>
                  {quantity}
                  <button className="btn_one mx-3" onClick={increaseQuantity}>
                    <AiOutlinePlus className="mx-2" />
                  </button>
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

      <div className="row my-2">
        <div className="col-lg-4 col-md-6 my-2">
          <div className="productreview my-2">
            <h4 className="header">Verified Customer Feedback</h4>

            {product?.reviews?.length === 0 && (
              <Message type="danger" message="No Reviews" />
            )}
            {errorProductReview && toastMessage("error", errorProductReview)}

            {userInfo ? (
              <>
                <form onSubmit={submitHandler} className="reviews">
                  <div className="form-group my-3">
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
                    Comment
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
              <div className="my-2 p-2 shadow-sm" key={review._id}>
                <span>{review.name}</span>
                <Rating value={review.rating} />
                <span> {timeFormat(review.createdAt)}</span>
                <span>{review.comment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-lg-12">
          <SectionHeader header="Similar Products" />
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
