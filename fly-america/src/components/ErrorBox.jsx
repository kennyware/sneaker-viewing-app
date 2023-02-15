import { StyledErrorBox } from "./styled/ErrorBox.styled";

const ErrorBox = ({ error }) => {
  return <StyledErrorBox>{error}</StyledErrorBox>;
};

export default ErrorBox;
