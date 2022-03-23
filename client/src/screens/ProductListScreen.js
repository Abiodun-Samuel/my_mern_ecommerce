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
import SectionHeader from "../components/SectionHeader";
import { GrChapterAdd } from "react-icons/gr";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  let { pageNumber } = useParams();
  if (!pageNumber) pageNumber = 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

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
      <div className="row mb-1 mt-5">
        <div className="col-lg-12">
          <SectionHeader header="All Products" />
        </div>
      </div>
      <button onClick={createProductHandler}>
        <GrChapterAdd className="mr-1" /> Create Product
      </button>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader fullPage={true} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <th scope="row">{index}</th>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <AiFillEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="d-inline-block px-1 py-0"
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-2">
            <Paginate page={page} pages={pages} isAdmin={true} />
          </div>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
