import styled from "styled-components";

export const StyledLogin = styled.section`
  width: 100%;
  height: 400px;
  display: flex;

  .login-group {
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid #111;
    padding: 20px;

    img {
      width: 80%;
      margin-top: 50px;
    }

    #login-form {
      margin-top: 80px;
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
