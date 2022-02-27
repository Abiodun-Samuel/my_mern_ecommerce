import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, userInfo.isAdmin, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Delete?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = (product) => {
    //
  };

  return (
    <>
      <h1>Product</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <span>ID, Name, Price, Category, brand</span>
          {products.map((product) => (
            <div key={product._id}>
              <span>{product._id}</span>
              <span>{product.name}</span>
              <span>{product.price}</span>
              <span>{product.category}</span>
              <span>{product.brand}</span>
              <span>
                <Link to={`/admin/product/${product._id}/edit`}>Edit</Link>
              </span>
              <span>
                <button onClick={() => deleteHandler(product._id)}>
                  Delete
                </button>
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
