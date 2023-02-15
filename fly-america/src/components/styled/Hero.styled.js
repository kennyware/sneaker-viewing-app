import styled from "styled-components";

export const StyledHero = styled.section`
  .hero {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${({ heroImgSrc }) => heroImgSrc}) no-repeat center;
    background-size: cover;
    position: relative;
    margin-bottom: 50px;

    .cta {
      padding: 10px;
      border: none;
      border-radius: 20px;
      color: #333;
      width: 160px;
      cursor: pointer;
      z-index: 2;

      &:hover {
        background: #aaa;
      }
    }
  }
`;
