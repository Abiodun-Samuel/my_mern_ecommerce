import React from "react";
import products from "../products";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HomeScreen;
