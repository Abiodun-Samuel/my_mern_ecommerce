import React from "react";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";
import { GrFireball } from "react-icons/gr";

const Category = ({ loadingCategory, errorCategory, categories }) => {
  return (
    <>
      {loadingCategory ? (
        <Loader fullPage={false} />
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
    </>
  );
};

export default Category;
