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
import SectionHeader from "../components/SectionHeader";

const ProductEditScreen = () => {
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [inflatedPrice, setInflatedPrice] = useState(0);
  const [image, setImage] = useState("");
  const images = [
    "ecommerce/dj2pmfuc6xamqmslkap8",
    "ecommerce/topvcb5mhsprzufoscib",
  ];
  // const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [category_slug, setCategorySlug] = useState("");
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

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/products");
    } else {
      if (!product || product.slug !== slug) {
        dispatch(listProductDetails(slug));
      } else {
        setName(product.name);
        setPrice(product.price);
        setInflatedPrice(product.inflatedPrice);
        setImage(product.image);
        // setImages(product.images);
        setBrand(product.brand);
        setCategory(product.category);
        setCategorySlug(product.category_slug);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }

    return () => {
      dispatch({ type: PRODUCT_CREATE_RESET });
    };
  }, [product, dispatch, slug, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        slug,
        name,
        price,
        inflatedPrice,
        image,
        images,
        brand,
        category,
        category_slug,
        countInStock,
        description,
      })
    );
  };

  const uploadImage = async (base64EncodedImage) => {
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
      console.log(data);
      setImage(data.public_id);
      setUpLoading(false);
    } catch (error) {
      console.error(error);
      setUpLoading(false);
    }
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
    };
  };

  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-12">
          <SectionHeader header="Update Product" />
          <div>
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
                  value={category_slug}
                  placeholder="Enter your category"
                  className="form-control"
                  onChange={(e) => setCategorySlug(e.target.value)}
                />
                <input
                  type="text"
                  value={description}
                  placeholder="Enter your description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>
                  <input type="file" onChange={uploadFileHandler} />
                  <span>Select Files</span>
                </label>
                {/* <input type="file" id="file" /> */}
                {uploading && <Loader smallPage={true} />}

                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEditScreen;
