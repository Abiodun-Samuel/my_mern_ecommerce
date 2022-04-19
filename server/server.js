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
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();
if (process.env.MODE === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "50mb" }));

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("/", (req, res) => {
  // res.send("welcome to my shop...");
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running on PORT: ${PORT}, in ${process.env.MODE} mode.`
  )
);
