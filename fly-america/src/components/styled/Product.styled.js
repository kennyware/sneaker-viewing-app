import styled from "styled-components";

export const StyledProduct = styled.div`
  max-width: 350px;
  position: relative;

  button {
    position: absolute;
    top: 20px;
    right: 25px;
    border: ${({ saved }) => (!saved ? "1.5px solid #111" : "transparent")};
    border-radius: 50%;
    background: none;
    height: 40px;
    width: 40px;
    cursor: pointer;
    transition: all 0.1s ease-in;
    z-index: 3;

    &:hover {
      background: ${({ saved }) => (!saved ? "#111" : "#fff")};
      color: ${({ saved }) => (!saved ? "#fff" : "#111")};

      svg {
        ${({ saved }) => saved && "fill: #fff"}
      }
    }

    svg {
      vertical-align: middle;
      height: 20px;
      width: 20px;
      ${({ saved }) => saved && "fill: #111"}
    }
  }

  a {
    text-decoration: none;
    color: #333;
    display: block;
  }

  h4 {
    margin-bottom: 15px;
    text-transform: capitalize;
  }

  h5 {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    .save-btn {
      display: none;
    }
  }
`;
