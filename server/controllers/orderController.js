import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//@desc create new order
//@route Post api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc get order by id
//@route get api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

//@desc update order to paid
//@route put api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        message: req.body.message,
        reference: req.body.reference,
        status: req.body.status,
        trans: req.body.trans,
        transaction: req.body.transaction,
      });
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

//@desc get logged user orders
//@route Get api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
});

// admin privileges

//@desc update order to delivered
//@route put api/orders/:id/delivered
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isDelivered = true), (order.deliveredAt = Date.now());
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

//@desc get all orders
//@route Get api/orders
//@access private/admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

const createOrderAndPay = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        message: req.body.message,
        reference: req.body.reference,
        status: req.body.status,
        trans: req.body.trans,
        transaction: req.body.transaction,
      },
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  createOrderAndPay,
};
