import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories } from "../actions/categoryActions";
import { productsListByCategory } from "../actions/productActions";
import Category from "../components/Category";
import HeroCarousel from "../components/HeroCarousel";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import SearchBox from "../components/SearchBox";
import { PRODUCTS_LIST_BY_CATEGORY_RESET } from "../constant/productConstants";

const CategoryScreen = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productListByCategory
  );
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = useSelector((state) => state.categoryList);

  useEffect(() => {
    dispatch(productsListByCategory(slug));
    dispatch(getCategories());

    return () => {
      dispatch({ type: PRODUCTS_LIST_BY_CATEGORY_RESET });
    };
  }, [dispatch, slug]);
  console.log(loading);
  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-4 my-2">
          <SearchBox />
          <div className="category-box shadow p-3">
            <h5>Categories</h5>
            <Category
              loadingCategory={loadingCategory}
              errorCategory={errorCategory}
              categories={categories}
            />
          </div>
        </div>
        <div className="col-lg-8 my-2">
          <div className="hero-img">
            <HeroCarousel />
          </div>
        </div>
      </div>

      <div className="row my-2">
        {/* <div className="col-lg-12">
          <h3>Products By Category</h3>
        </div> */}
        {loading ? (
          <Loader fullPage={true} />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <p>
              You have searched for all the products in <b>{}</b> Category
            </p>
            <div className="row">
              {products?.map((product) => {
                return (
                  <div className="col-lg-3" key={product._id}>
                    <Product product={product} key={product._id} />
                  </div>
                );
              })}
            </div>
          </>
        )}
        {/* {loading && <Loader fullPage={true} />}
          {error && <Message>{error}</Message>}
          {products &&
            products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })} */}
      </div>
    </>
  );
};

export default CategoryScreen;
