import { StyledLoader, Rotate } from "./styled/ProductSection.styled";
import { RiLoader4Line } from "react-icons/ri";

const Loader = () => {
  return (
    <StyledLoader>
      <Rotate>
        <RiLoader4Line />
      </Rotate>
    </StyledLoader>
  );
};

export default Loader;
