import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to="/" className="btn btn-primary">
            Go somewhere
          </Link>
          <Link to="/" className="btn btn-primary">
            Go somewhere
          </Link>
        </div>
      </div>

      <Link to={`/product/${product._id}`}>
        <Card className="my-2 rounded border-0 shadow-sm bg-white">
          <Card.Img src={product.image} variant="top" alt={product.name} />

          <Card.Body>
            <Link to={`/product/${product._id}`}>
              <Card.Title as="div">
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>
          </Card.Body>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3"> ${product.price}</Card.Text>
        </Card>
      </Link>
    </>
  );
};

export default Product;
