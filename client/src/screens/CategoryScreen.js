import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories } from "../actions/categoryActions";
import {
  listTopProducts,
  productsListByCategory,
} from "../actions/productActions";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import SearchBox from "../components/SearchBox";
import SectionHeader from "../components/SectionHeader";
import { PRODUCTS_LIST_BY_CATEGORY_RESET } from "../constant/productConstants";
import hero1 from "../images/bg/hero1.jpg";
import hero2 from "../images/bg/hero2.jpg";
import hero3 from "../images/bg/hero3.jpg";

const CategoryScreen = () => {
  const images = [hero1, hero2, hero3];
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
  const {
    loading: topProductsLoading,
    error: topProductsError,
    products: topProducts,
  } = useSelector((state) => state.productTopRated);

  useEffect(() => {
    dispatch(productsListByCategory(slug));
    dispatch(getCategories());
    dispatch(listTopProducts());

    return () => {
      dispatch({ type: PRODUCTS_LIST_BY_CATEGORY_RESET });
    };
  }, [dispatch, slug]);

  const formatSlug = (slug) => {
    if (!loadingCategory && !error && categories) {
      const [filtered] = categories.filter((x) => {
        return x.category_slug === slug;
      });
      return filtered?.category_name;
    }
  };

  return (
    <>
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
            <Carousel images={images} source="local" />
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-lg-12">
          <SectionHeader
            header={
              formatSlug(slug) ? `${formatSlug(slug)} Products` : "Products"
            }
            desc="Your Search Results"
          />
        </div>
      </div>

      {loading ? (
        <Loader fullPage={true} />
      ) : error ? (
        <Message type="danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            {products?.map((product) => {
              return (
                <div
                  className="col-lg-2 col-md-4 col-sm-6 col-6"
                  key={product._id}
                >
                  <Product product={product} key={product._id} />
                </div>
              );
            })}
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
        <Loader fullPage={true} />
      ) : topProductsError ? (
        <Message variant="danger">{topProductsError}</Message>
      ) : (
        <>
          <div className="row my-2">
            {topProducts.map((product) => {
              return (
                <div
                  className="col-lg-2 col-md-4 col-sm-6 col-6"
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

export default CategoryScreen;
