import { StyledLogo } from "./styled/Logo.styled";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Logo = ({ toggleMenu }) => {
  return (
    <StyledLogo className="logo" onClick={toggleMenu}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </StyledLogo>
  );
};

export default Logo;
