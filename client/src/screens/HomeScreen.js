import React from "react";
import axios from "axios";
// import products from "../products";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("api/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);
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
