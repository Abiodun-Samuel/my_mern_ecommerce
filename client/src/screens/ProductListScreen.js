import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constant/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  let { pageNumber } = useParams();
  if (!pageNumber) pageNumber = 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  console.log(page, pages, products);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    userInfo.isAdmin,
    navigate,
    successDelete,
    createdProduct,
    successCreate,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Delete?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <h1>Product</h1>
      <button onClick={createProductHandler}>Create Product</button>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
