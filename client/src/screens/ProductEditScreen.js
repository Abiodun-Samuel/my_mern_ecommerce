import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_CREATE_RESET } from "../constant/productConstants";

const ProductEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  //   const userUpdate = useSelector((state) => state.userUpdate);
  //   const {
  //     loading: loadingUpdate,
  //     error: errorUpdate,
  //     success: successUpdate,
  //   } = userUpdate;

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(listProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
    return () => {
      dispatch({ type: PRODUCT_CREATE_RESET });
    };
  }, [product, dispatch, id, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Link className="btn btn-primary" to="/admin/products">
        Go Back
      </Link>
      <h2>Update User</h2>
      {/* {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            value={price}
            placeholder="Enter your price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            value={image}
            placeholder="Enter your email"
            className="form-control"
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            value={brand}
            placeholder="Enter your email"
            className="form-control"
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            value={brand}
            placeholder="Enter your brand"
            className="form-control"
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="number"
            value={countInStock}
            placeholder="Enter your count in stock"
            className="form-control"
            onChange={(e) => setCountInStock(e.target.value)}
          />
          <input
            type="text"
            value={category}
            placeholder="Enter your category"
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder="Enter your description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input type="submit" value="Update" className="btn btn-primary" />
        </form>
      )}

      <div></div>
    </div>
  );
};

export default ProductEditScreen;
