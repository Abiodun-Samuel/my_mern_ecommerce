import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword } = useParams();
  let { pageNumber } = useParams();
  if (!pageNumber) pageNumber = 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  let { loading, error, products, page, pages } = productList;
  React.useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Row>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link className="btn btn-primary" to="/">
            HomePage
          </Link>
        )}
      </Row>

      <Row>
        <h1>Latest Products</h1>
        {loading ? (
          <Loader fullPage={true} imgHeight="100px" />
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
      </Row>
    </>
  );
};

export default HomeScreen;
