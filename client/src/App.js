import "./App.css";
import { Suspense, lazy } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import "bootstrap/dist/css/bootstrap.min.css";


// import ProductEditScreen from "./screens/ProductEditScreen";
// import OrderListScreen from "./screens/OrderListScreen";
// import SearchScreen from "./screens/SearchScreen";
// import WishListScreen from "./screens/WishListScreen";
import Loader from "./components/Loader";

// import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
// import ProductListScreen from "./screens/ProductListScreen";

const ProductEditScreen = lazy(() => import("./screens/ProductEditScreen"));
const OrderListScreen = lazy(() => import("./screens/OrderListScreen"));
const SearchScreen = lazy(() => import("./screens/SearchScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const LoginScreen = lazy(() => import("./screens/LoginScreen"));
const ProductListScreen = lazy(() => import("./screens/ProductListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));
const WishListScreen = lazy(() => import("./screens/WishListScreen"));

function App() {
  // function onChange(value) {
  //   console.log("Captcha value:", value);
  // }
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Suspense fallback={<Loader fullPage={true} />}>
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/place-order" element={<PlaceorderScreen />} />
              <Route path="/order/:orderId" element={<OrderScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart">
                <Route path=":id" element={<CartScreen />} />
                <Route path="" element={<CartScreen />} />
              </Route>
              <Route path="/wishlist" element={<WishListScreen />} />
              <Route path="/admin/users" element={<UserListScreen />} />
              <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
              <Route path="/admin/products" element={<ProductListScreen />} />
              <Route
                path="/admin/products/:pageNumber"
                element={<ProductListScreen />}
              />
              <Route
                path="/admin/product/:id/edit"
                element={<ProductEditScreen />}
              />
              <Route path="/admin/orders" element={<OrderListScreen />} />
              <Route path="/search/:keyword" element={<SearchScreen />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<SearchScreen />}
              />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Suspense>
        </Container>
        {/* <div className="App">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
            onChange={onChange}
          />
        </div> */}
      </main>
      <Footer />
    </Router>
  );
}

export default App;
