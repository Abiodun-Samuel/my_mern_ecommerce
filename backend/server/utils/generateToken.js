import Jwt from "jsonwebtoken";

const generateToken = (id, name, email) => {
  return Jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
