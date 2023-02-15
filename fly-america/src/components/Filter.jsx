import { StyledFilter } from "./styled/Filter.styled";
import { MdFilterList } from "react-icons/md";

const Filter = ({ toggleMenu }) => {
  return (
    <StyledFilter onClick={toggleMenu}>
      Filter <MdFilterList />
    </StyledFilter>
  );
};

export default Filter;
