import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import Paginate from "../components/Paginate";

const SearchScreen = () => {
  const { keyword } = useParams();
  let { pageNumber } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  React.useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link className="btn btn-primary" to="/">
          HomePage
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <h2>
          <Loader fullPage={true} />
        </h2>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default SearchScreen;
