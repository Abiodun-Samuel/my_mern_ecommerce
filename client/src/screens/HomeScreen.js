import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listTopProducts } from "../actions/productActions";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { getCategories } from "../actions/categoryActions";
import Category from "../components/Category";
import SectionHeader from "../components/SectionHeader";
import hero1 from "../images/bg/hero1.jpg";
import hero2 from "../images/bg/hero2.jpg";
import hero3 from "../images/bg/hero3.jpg";
import Carousel from "../components/Carousel";
import { toastMessage } from "../utils/utils";

const HomeScreen = () => {
  const images = [hero1, hero2, hero3];
  const { keyword } = false;
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

  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch(getCategories());
    dispatch(listTopProducts());
  }, [dispatch, keyword, pageNumber]);

  // const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      {/* hero section  */}
      <div className="row my-5">
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
            <Carousel images={images} source="local" />
          </div>
        </div>
      </div>

      {/* All products  */}
      <div className="row my-2">
        <div className="col-lg-12">
          <SectionHeader header="Latest Products" />
        </div>
      </div>

      {loading ? (
        <Loader fullPage={true} />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            {products.map((product) => {
              return (
                <div
                  className="col-lg-2 col-md-4 col-sm-6 col-6 my-2"
                  key={product._id}
                >
                  <Product product={product} />
                </div>
              );
            })}
          </div>

          <div className="row my-2">
            <div className="col-lg-12">
              <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ""}
              />
            </div>
          </div>
        </>
      )}

      {/* Top Rated Products  */}
      <div className="row my-2">
        <div className="col-lg-12">
          <SectionHeader header="Top Rated Products" />
        </div>
      </div>

      {topProductsLoading ? (
        <Loader smallPage={true} />
      ) : topProductsError ? (
        toastMessage("error", topProductsError)
      ) : (
        /* <Message variant="danger">{topProductsError}</Message> */
        <>
          <div className="row my-2">
            {topProducts.map((product) => {
              return (
                <div
                  className="col-lg-2 col-md-4 col-sm-6 col-6 my-2"
                  key={product._id}
                >
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
