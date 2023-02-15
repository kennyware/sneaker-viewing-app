import { StyledNavbar } from "./styled/Navbar.styled";
import { MdPersonOutline, MdMenu, MdOutlineLogout } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <>
      <StyledNavbar>
        <button
          className="menu-btn"
          onClick={() => setToggleMobileNav(!toggleMobileNav)}
        >
          <MdMenu />
        </button>
        <Logo />

        <ul>
          <li>
            <Link to="/products/?gender=men">Mens</Link>
          </li>
          <li>
            <Link to="/products/?gender=women">Womens</Link>
          </li>
          <li>
            <Link to="/products/?gender=child,preschool,toddler">Kids</Link>
          </li>
        </ul>

        <div className="nav-right">
          <SearchBar />

          <div className="action-icons">
            <Link to="/bag" className="bag-btn">
              <button>
                <FiShoppingBag />
              </button>
            </Link>
            {user ? (
              <button className="logout-btn" onClick={onLogout}>
                <MdOutlineLogout /> <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="account-btn">
                <button>
                  <MdPersonOutline />
                </button>
              </Link>
            )}
          </div>
        </div>
      </StyledNavbar>
      {toggleMobileNav && (
        <MobileMenu
          toggleMenu={() => setToggleMobileNav(!toggleMobileNav)}
          logout={onLogout}
          user={user}
        />
      )}
    </>
  );
};

export default Navbar;
