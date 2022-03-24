import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constant/productConstants";
import axios from "axios";

const ProductEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [inflatedPrice, setInflatedPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [uploading, setUpLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  //   const userUpdate = useSelector((state) => state.userUpdate);
  //   const {
  //     loading: loadingUpdate,
  //     error: errorUpdate,
  //     success: successUpdate,
  //   } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/products");
    } else {
      if (!product || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setInflatedPrice(product.inflatedPrice);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }

    return () => {
      dispatch({ type: PRODUCT_CREATE_RESET });
    };
  }, [product, dispatch, id, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        inflatedPrice,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    // original
    // const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append("image", file);
    setUpLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/upload/upload-cloudinary",
        JSON.stringify({ data: base64EncodedImage }),
        config
      );
      // console.log(data);
      setImage(data.public_id);
      setUpLoading(false);
    } catch (error) {
      console.error(error);
      setUpLoading(false);
    }
    // try {
    //   await fetch("/api/upload", {
    //     method: "POST",
    //     body: JSON.stringify({ data: base64EncodedImage }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   setSuccessMsg("Image uploaded successfully");
    // } catch (err) {
    //   console.error(err);
    //   setErrMsg("Something went wrong!");
    // }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };

    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  return (
    <div>
      <Link className="btn btn-primary" to="/admin/products">
        Go Back
      </Link>
      <h2>Update User</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
            type="number"
            value={inflatedPrice}
            placeholder="Enter your price(market price)"
            className="form-control"
            onChange={(e) => setInflatedPrice(e.target.value)}
          />
          <input
            type="text"
            value={image}
            placeholder="Enter your email"
            className="form-control"
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="file"
            label="choose file"
            id="file"
            onChange={uploadFileHandler}
          />
          {uploading && <Loader smallPage={true} />}
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
    </div>
  );
};

export default ProductEditScreen;
