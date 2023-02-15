import styled from "styled-components";

export const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #111;
  border-radius: 20px;
  width: 90px;
  padding: 2.5px 0;
  transition: all 0.1s ease-in;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background: #111;
    color: #fff;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
`;
