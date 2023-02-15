import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    right: -1000px;
  }

  to {
    right: 0;
  }
`;

export const StyledMobileMenu = styled.div`
  position: fixed;
  width: 90%;
  height: 100%;
  background: #fff;
  top: 0;
  right: 0;
  z-index: 100;
  animation: ${slideIn} 0.5s linear forwards;

  a {
    text-decoration: none;
    color: #111;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    text-align: right;
    float: right;
    margin: 20px;
  }

  ul {
    clear: right;
    list-style: none;
    padding: 20px;

    li {
      margin-bottom: 20px;
      font-size: 1.25rem;
    }
  }

  .account {
    width: 100%;
    border-top: 1px solid #111;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 1.25rem;
    margin-top: 50px;

    a {
      display: block;
      margin-bottom: 20px;
    }

    button {
      display: block;
      border: none;
      background: none;
      font-size: 1.25rem;
    }
  }
`;
