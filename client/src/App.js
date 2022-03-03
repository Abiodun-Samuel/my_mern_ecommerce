import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import SearchScreen from "./screens/SearchScreen";

function App() {
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
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
        </Container>
        <div className="App">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
            onChange={onChange}
          />
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
