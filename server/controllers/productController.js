import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import { randomString, slugify } from "../utils/helper.js";

//@desc fetch all products
//@route GET api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ updatedAt: -1 });
  // res.status(401);
  // throw new Error("not authorized");
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc fetch a single product
//@route GET api/products/:slug
//@access public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
 
  if (product) {
    const similarProducts = await Product.find({
      category_slug: product.category_slug,
      slug: { $nin: req.params.slug },
    });
    res.json(similarProducts);
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Admin Privileges
//@desc delete a single product
//@route DELETE /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    await product.remove();
    res.json({ message: "Product has been deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc create a single product
//@route CREATE /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    slug: `${slugify("Sample name")}-${randomString(3)}`,
    price: 0,
    inflatedPrice: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    category_slug: "sample-category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a single product
//@route PUT /api/products/;id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    inflatedPrice,
    description,
    brand,
    category,
    category_slug,
    image,
    images,
    countInStock,
  } = req.body;

  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    product.name = name;
    product.slug = slugify(name);
    product.price = price;
    product.inflatedPrice = inflatedPrice;
    product.description = description;
    product.image = image;
    product.images = images;
    product.brand = brand;
    product.category = category;
    product.category_slug = category_slug;
    product.countInStock = countInStock;

    const slugExist = await Product.findOne({ slug: product.slug });
    if (!slugExist) {
      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      product.slug = slugify(name) + "-" + randomString(3);
      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc create new review
//@route POST /api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this product");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res
      .status(201)
      .json({ message: "Your review has been added for this product" });
  } else {
    res.status(404);
    throw new error("This product can not be found");
  }
});

//@desc get top rated products
//@route GET /api/products/top
//@access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(6);
  res.json(products);
});

//@desc fetch a products by category
//@route GET api/:category/products
//@access public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({
    category_slug: req.params.category_slug,
  });
  if (products.length > 0) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("No products was found in this Category");
  }
});

// /@desc fetch similar products
//@route GET api/:products/products
//@access public

export {
  getProducts,
  getProductBySlug,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
};
