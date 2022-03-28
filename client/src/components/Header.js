import { HiOutlineShoppingCart, HiOutlineUsers } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { CgMenuGridR } from "react-icons/cg";
import { FaListOl, FaUserLock, FaUserAlt, FaSignInAlt } from "react-icons/fa";
import { BsFillBasket2Fill } from "react-icons/bs";
import { ImUserCheck } from "react-icons/im";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineLogin, AiOutlineMail } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);
  const wishListItems = [];
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg bg-white shadow fixed-top">
          <Link className="navbar-brand m-0 p-0" to="/">
            Drips Empire
          </Link>

          <div className="d-block ml-auto">
            <div className="mobile-nav mr-2">
              <Link className="mobile-cart" to="/cart">
                <span className="mobile-count">{cartItems?.length}</span>
                <span>
                  <HiOutlineShoppingCart className="position-relative" />
                </span>
              </Link>
            </div>
            <div className="mobile-nav mr-2">
              <Link className="mobile-wish" to="/wishlist">
                <span className="mobile-count">{wishListItems?.length}</span>
                <span>
                  <FaListOl className="position-relative" />
                </span>
              </Link>
            </div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar--icon">
              <CgMenuGridR />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userInfo ? (
                    <>
                      <ImUserCheck className="mr-2 ml-1" />
                      <span>{userInfo?.name}</span>
                    </>
                  ) : (
                    <>
                      <FaUserAlt className="mr-2 ml-1" />
                      <span>Account</span>
                    </>
                  )}
                </Link>
                <div
                  className="dropdown-menu shadow"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {userInfo ? (
                    <>
                      <Link className="dropdown-item" to="/profile">
                        <FaUserAlt className="mr-2" /> Profile
                      </Link>
                      <Link className="dropdown-item" to="/orders">
                        <BsFillBasket2Fill className="mr-2" /> Orders
                      </Link>
                      <Link className="dropdown-item" to="/inbox">
                        <AiOutlineMail className="mr-2" /> Inbox
                      </Link>
                      <hr />
                      <button
                        className="dropdown-item shadow auth"
                        onClick={logoutHandler}
                      >
                        <FiLogOut className="mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link className="dropdown-item shadow auth" to="/login">
                        <AiOutlineLogin className="mr-2" /> Sign In
                      </Link>
                      <hr />
                      <Link className="dropdown-item shadow auth" to="register">
                        <FaSignInAlt className="mr-2" /> Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <div className="nav-icon">
                    <span className="count shadow-sm">{cartItems?.length}</span>
                    <HiOutlineShoppingCart className="mr-3 ml-2 position-relative" />
                  </div>
                  <div>Cart</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  <div className="nav-icon">
                    <span className="count shadow-sm">
                      {wishListItems?.length}
                    </span>
                    <FaListOl className="mr-3 ml-2 position-relative" />
                  </div>
                  <div>Wishlist</div>
                </Link>
              </li>
              {userInfo && userInfo.isAdmin && (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserLock className="mx-2" />
                    Admin
                  </Link>
                  <div
                    className="dropdown-menu shadow"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Link className="dropdown-item" to="/admin/users">
                      <HiOutlineUsers className="mr-2" /> Users
                    </Link>
                    <Link className="dropdown-item" to="/admin/products">
                      <MdProductionQuantityLimits className="mr-2" /> Products
                    </Link>
                    <Link className="dropdown-item" to="/admin/orders">
                      <BsFillBasket2Fill className="mr-2" /> Orders
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
