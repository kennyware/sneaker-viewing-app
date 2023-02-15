import styled, { keyframes } from "styled-components";

const dropDown = keyframes`
0% {
top: -1000px;
}

100% {
top: 0;
}
`;

export const StyledSorter = styled.div`
  .dropdown {
    position: relative;

    .header {
      margin-right: 5px;

      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        color: #666;
        margin-left: 5px;
      }

      &:hover {
        span {
          color: #333;
        }
      }
    }
  }

  .dropdown-container {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 30px;
    overflow: hidden;
  }

  .dropdown-options {
    background: #fff;
    border: 1px solid #111;
    width: 160px;
    position: relative;
    top: -1000px;
    animation: ${dropDown} 0.3s ease-out forwards;

    div {
      border-bottom: 1px solid #111;
      padding: 5px 10px;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }

    div:last-of-type {
      border: none;
    }
  }

  select {
    margin-left: 5px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #666;
    width: 100px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
