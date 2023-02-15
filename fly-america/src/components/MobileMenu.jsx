import { StyledMobileMenu } from "./styled/MobileMenu.styled";
import { DarkOverlay } from "./styled/FilterMenu.styled";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";

const MobileMenu = ({ toggleMenu, logout, user }) => {
  return (
    <>
      <DarkOverlay onClick={toggleMenu} />
      <StyledMobileMenu>
        <button className="close-btn" onClick={toggleMenu}>
          <CgClose />
        </button>
        <ul>
          <li>
            <Link to="/products/?gender=men" onClick={toggleMenu}>
              Mens
            </Link>
          </li>
          <li>
            <Link to="/products/?gender=women" onClick={toggleMenu}>
              Womens
            </Link>
          </li>
          <li>
            <Link
              to="/products/?gender=child,preschool,toddler"
              onClick={toggleMenu}
            >
              Kids
            </Link>
          </li>
        </ul>

        <div className="account">
          {user === null ? (
            <>
              <Link to="/register" onClick={toggleMenu}>
                Sign Up
              </Link>

              <Link to="/login" onClick={toggleMenu}>
                Sign In
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                toggleMenu();
                logout();
              }}
            >
              Logout
            </button>
          )}
        </div>
      </StyledMobileMenu>
    </>
  );
};

export default MobileMenu;
