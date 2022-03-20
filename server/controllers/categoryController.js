import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

//@desc create new category
//@route Post api/category
//@access private
const addCategory = asyncHandler(async (req, res) => {
  const { category_name, category_slug } = req.body;
  const category = new Category({
    category_name,
    category_slug,
  });
  const createdCategory = await category.save();
  if (createdCategory) {
    res.status(201).json({
      status: "ok",
      message: "New Category has been added successfully",
    });
  } else {
    res
      .status(404)
      .json({ status: "error", message: "Category could not be added" });
  }
});

//@desc get all categories
//@route Get api/category
//@access public
const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

//@desc fetch a products by category
//@route GET api/:category/products
//@access public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const [category] = await Category.find({
    category_slug: req.params.slug,
  });
  if (category) {
    const cat_name = category.category_name;
    const products = await Product.find({
      category: cat_name,
    });
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { addCategory, getCategory, getProductsByCategory };
