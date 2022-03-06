import asyncHandler from "express-async-handler";

//@desc get paystack client id
//@route Post api/payment/paystack client id
//@access admin/private
const getPayStackPublicKey = asyncHandler(async (req, res) => {
  res.send(process.env.PAYSTACK_PUBLIC_KEY);
});

export { getPayStackPublicKey };
