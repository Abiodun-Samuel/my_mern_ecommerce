import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
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
import { GrFireball } from "react-icons/gr";

const HomeScreen = () => {
  const { keyword } = useParams();
  let { pageNumber } = useParams();
  if (!pageNumber) pageNumber = 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = useSelector((state) => state.categoryList);

  let { loading, error, products, page, pages } = productList;
  React.useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    // dispatch(getCategories());
  }, [dispatch, keyword, pageNumber]);
  useMemo(() => dispatch(getCategories()), [dispatch]);

  return (
    <>
      <div className="row mt-5">
        <div className="col-lg-4 my-2">
          <SearchBox />
          <div className="category-box shadow p-3">
            <h5>Categories</h5>
            {loadingCategory ? (
              <Loader smallPage={true} />
            ) : errorCategory ? (
              <Message variant="danger">{errorCategory}</Message>
            ) : (
              categories?.map((cat) => (
                <p key={cat.category_slug}>
                  <Link to={`/category/${cat.category_slug}`}>
                    <GrFireball className="mr-1" /> {cat.category_name}
                  </Link>
                </p>
              ))
            )}
            {/* {loadingCategory && <Loader smallPage={true} />}
            {errorCategory && (
              <Message variant="danger">{errorCategory}</Message>
            )}
            {categories?.map((cat) => (
              <p key={cat.category_slug}>
                <Link to={`/category/${cat.category_slug}`}>
                  {cat.category_name}
                </Link>
              </p>
            ))} */}
          </div>
        </div>
        <div className="col-lg-8 my-2">
          <div className="hero-img">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </>
  );
};

//  <>
//       <Row>
//         {!keyword ? (
//           <ProductCarousel />
//         ) : (
//           <Link className="btn btn-primary" to="/">
//             HomePage
//           </Link>
//         )}
//       </Row>

//       <Row>
//         <h1>Latest Products</h1>
//         {loading ? (
//           <Loader fullPage={true} imgHeight="100px" />
//         ) : error ? (
//           <Message variant="danger">{error}</Message>
//         ) : (
//           <>
//             {products.map((product) => {
//               return (
//                 <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
//                   <Product product={product} />
//                 </Col>
//               );
//             })}
//             <Paginate
//               page={page}
//               pages={pages}
//               keyword={keyword ? keyword : ""}
//             />
//           </>
//         )}
//       </Row>
//     </>

export default HomeScreen;
