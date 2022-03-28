import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { ToastContainer } from "react-toastify";
// import Loader from "./components/Loader";
// import ReCAPTCHA from "react-google-recaptcha";

const ProductEditScreen = lazy(() => import("./screens/ProductEditScreen"));
const OrderListScreen = lazy(() => import("./screens/OrderListScreen"));
const SearchScreen = lazy(() => import("./screens/SearchScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));
const ProductListScreen = lazy(() => import("./screens/ProductListScreen"));
const UserEditScreen = lazy(() => import("./screens/UserEditScreen"));
const UserListScreen = lazy(() => import("./screens/UserListScreen"));
const OrderScreen = lazy(() => import("./screens/OrderScreen"));
const PlaceorderScreen = lazy(() => import("./screens/PlaceorderScreen"));
const ShippingScreen = lazy(() => import("./screens/ShippingScreen"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const PaymentScreen = lazy(() => import("./screens/PaymentScreen"));
const ProductScreen = lazy(() => import("./screens/ProductScreen"));
const CartScreen = lazy(() => import("./screens/CartScreen"));
const CategoryScreen = lazy(() => import("./screens/CategoryScreen"));

function App() {
  return (
    <>
      <Header />
      <main className="container-fluid pt-3" style={{ minHeight: "90vh" }}>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/category/:slug" element={<CategoryScreen />} />
            <Route path="/cart">
              <Route path=":id" element={<CartScreen />} />
              <Route path="" element={<CartScreen />} />
            </Route>
            <Route path="/wishlist" element={<WishListScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/place-order" element={<PlaceorderScreen />} />
            <Route path="/order/:orderId" element={<OrderScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/admin/users" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/products" element={<ProductListScreen />} />
            <Route
              path="/admin/products/:pageNumber"
              element={<ProductListScreen />}
            />
            <Route
              path="/admin/product/:slug/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/admin/orders" element={<OrderListScreen />} />
            <Route path="/search/:keyword" element={<SearchScreen />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<SearchScreen />}
            />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="*" element={<>Not Found</>} />
          </Routes>
        </Suspense>
      </main>
      <ToastContainer />
      <Footer />
      {/* <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
            onChange={onChange}
          /> */}
    </>
  );
}

export default App;
