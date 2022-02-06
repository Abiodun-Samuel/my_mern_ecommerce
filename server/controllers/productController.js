import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc fetch all products
//@route GET api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(401);
  // throw new Error("not authorized");
  res.json(products);
});

//@desc fetch a single product
//@route GET api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
  //  } else {
  //    res.status(404).json({ message: "Product does not exist" });
  //  }
});

export { getProducts, getProductById };
