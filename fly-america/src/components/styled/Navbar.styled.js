import styled from "styled-components";

export const StyledNavbar = styled.nav`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;

  ul {
    list-style-type: none;
    display: flex;
    justify-content: center;

    li {
      margin: 0 10px;
      padding-bottom: 10px;
      border-bottom: 2px solid transparent;

      a {
        text-decoration: none;
        color: #222;
      }

      &:hover {
        border-bottom: 2px solid #000;
      }
    }
  }

  .nav-right {
    display: flex;
  }

  .action-icons {
    display: flex;
    align-items: center;

    button {
      display: block;
      background: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      width: 40px;
      height: 40px;
      transition: all 0.1s;
      padding: 5px;

      color: #111;

      &:hover {
        background: rgba(100, 100, 100, 0.4);
      }
    }

    .logout-btn {
      width: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 10px;

      svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }

  .bag-btn {
    margin-right: 5px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .account-btn svg {
    width: 25px;
    height: 25px;
  }

  .menu-btn {
    display: none;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 33.33%);
    align-items: center;

    .nav-right {
      justify-content: flex-end;
    }

    ul {
      display: none;
    }

    .menu-btn {
      display: block;
    }

    .bag-btn {
      margin: 0;
      button {
        width: 20px;
        height: 20px;
        padding: 0;
      }
    }

    .action-icons {
      .account-btn,
      .logout-btn {
        display: none;
      }
    }
  }
`;
