import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listTopProducts } from "../actions/productActions";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import video from "../images/bg/hero-video.mp4";
import HeroCarousel from "../components/HeroCarousel";
import SearchBox from "../components/SearchBox";
import { getCategories } from "../actions/categoryActions";
import Category from "../components/Category";
import SectionHeader from "../components/SectionHeader";

const HomeScreen = () => {
  const { keyword } = false;
  // const { keyword } = useParams();
  let { pageNumber } = useParams();
  if (!pageNumber) pageNumber = 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = useSelector((state) => state.categoryList);

  const {
    loading: topProductsLoading,
    error: topProductsError,
    products: topProducts,
  } = useSelector((state) => state.productTopRated);

  console.log(topProducts);

  const { loading, error, products, page, pages } = productList;
  React.useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch(getCategories());
    dispatch(listTopProducts());
  }, [dispatch, keyword, pageNumber]);
  // useMemo(() => dispatch(getCategories()), [dispatch]);

  return (
    <>
      {/* hero section  */}
      <div className="row mt-5 mb-4">
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

      {/* All products  */}
      <div className="row my-1">
        <div className="col-lg-12">
          <SectionHeader header="Latest Products" />
        </div>
      </div>

      <div className="row my-1">
        {loading ? (
          <Loader fullPage={true} />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
            <Paginate
              page={page}
              pages={pages}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>

      {/* Top Rated Products  */}
      <div className="row my-1">
        <div className="col-lg-12">
          <SectionHeader header="Top Rated Products" />
        </div>
      </div>

      <div className="row my-1">
        {loading ? (
          <Loader fullPage={true} />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {topProducts.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

// {
/* <Row>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link className="btn btn-primary" to="/">
            HomePage
          </Link>
        )}
      </Row> */
// }

export default HomeScreen;
