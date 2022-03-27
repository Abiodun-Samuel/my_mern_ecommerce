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
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { customSweetAlert } from "../utils/utils";
import swal from "@sweetalert/with-react";

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
      navigate(`/admin/product/${createdProduct.slug}/edit`);
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

  const deleteHandler = (slug) => {
    customSweetAlert(
      "Caution",
      "Do you want to delete this product?",
      "warning",
      "Delete",
      () => {
        dispatch(deleteProduct(slug));
        swal("Complete", `Product has been deleted successfully`, "success");
      }
    );
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <div className="row mb-1 mt-5">
        <div className="col-lg-12">
          <SectionHeader header="All Products" />
          <div className="d-flex justify-content-end">
            <button onClick={createProductHandler} className="btn_one my-2">
              <AiOutlinePlus className="mr-1" />
              Product
            </button>
          </div>
        </div>
      </div>

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
            <table className="table table-hover shadow-sm">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price (2)</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">In Stock</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.name}</td>
                    <td>{product.inflatedPrice}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.countInStock}</td>
                    <td>{product.brand}</td>
                    <td className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/admin/product/${product.slug}/edit`}
                        className="table_edit_btn"
                      >
                        <AiFillEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandler(product.slug)}
                        className="table_del_btn"
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
