import styled from "styled-components";

export const StyledCollections = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-top: 20px;

  a {
    text-decoration: none;
    color: #111;
  }

  div {
    text-align: center;
    font-size: 1.2rem;

    img {
      max-height: 550px;
      cursor: pointer;
      transition: all 0.1s;

      &:hover {
        opacity: 70%;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    div:nth-of-type(3) {
      grid-column: 1 / 3;
    }
  }

  @media (max-width: 426px) {
    grid-template-columns: auto;
    gap: 20px;
    justify-content: center;

    div:nth-of-type(3) {
      grid-column: 1;
    }
  }
`;
