import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { toast, ToastContainer } from "react-toastify";
import { PRODUCT_DETAILS_RESET } from "../constant/productConstants";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constant/productConstants";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = useSelector((state) => state.productCreateReview);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    };
  }, [dispatch, id, successProductReview]);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);

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
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };
  return (
    <>
      <ToastContainer />
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/cart">Cart</Link>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <div className="row">
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
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
