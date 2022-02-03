import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>...loading</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
