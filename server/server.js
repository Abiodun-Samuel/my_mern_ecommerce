import "dotenv/config";
import express from "express";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import colors from "colors";
import productsRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();
if (process.env.MODE === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "50mb" }));

const __dirname = path.resolve();
var corsOptions = { origin: "*" };
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.get("/", (req, res) => {
  res.send("welcome to my shop...");
  // app.use(express.static(path.join(__dirname, "/client/build")));
  // res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // app.get("*", (req, res) =>
  // );
});
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/send_mail", mailRoutes);

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//production
// if (process.env.MODE === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("welcome to my shop...");
//   });
// }

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `Server is running on PORT: ${PORT}, in ${process.env.MODE} mode.`
  )
);

// export const BASE_URL = () => {
//   if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//     //development
//   } else {
//     // production code
//   }
// };
