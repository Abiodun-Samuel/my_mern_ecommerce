import { main } from "../config/mail.js";
import User from "../models/userModel.js";

// send request product info mail
const productRequestMail = async (req, res) => {
  const user = await User.findById(req.user._id);
  const message = `<p></p><b>Name:</b> ${user.name} </p>
                       <p><b>Email:</b> ${user.email} </p>
                       <p><b>Product Name:</b> ${req.body.product} </p>
                       <p><b>Product Id:</b> ${req.body.id} </p>
                       <p><b>Message:</b> ${req.body.request}</p>`;
  const response = main(message, "Product Request", user.email);
  res.status(201).json(response);
};
export { productRequestMail };
