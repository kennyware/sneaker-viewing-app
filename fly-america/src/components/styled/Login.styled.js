import styled from "styled-components";

export const StyledLogin = styled.section`
  width: 100%;
  display: flex;
  padding-top: 60px;

  .login-group {
    width: 50%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #111;
    padding-top: 50px;

    h1 {
      margin-bottom: 20px;
    }

    img {
      max-width: 80%;
    }

    #login-form {
      margin-top: 40px;
      margin-bottom: 20px;
      input {
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1.5px solid #aaa;
        padding: 2px 10px;
        transition: all 0.1s;

        &:focus {
          border-color: #000;
          outline: none;
        }
      }

      label {
        position: absolute;
        display: none;
      }

      div {
        position: relative;
        width: 300px;
        margin-bottom: 20px;
      }

      button {
        background: #111;
        width: 300px;
        border: none;
        outline: none;
        color: #fff;
        padding: 10px;
        margin-top: 50px;
        cursor: pointer;
        transition: all 0.1s;

        &:hover {
          opacity: 70%;
        }
      }
    }
  }

  p a {
    color: blue;
  }

  @media (max-width: 426px) {
    grid-template-columns: auto;
    justify-content: center;

    .display {
      display: none;
    }

    .login-group {
      width: 90%;
    }
  }
`;
