import styled from "styled-components";

export const StyledProductDisplay = styled.div`
  display: grid;
  grid-template-columns: 60% auto;
  grid-template-rows: 100px auto;
  justify-content: center;
  column-gap: 50px;

  .product-display {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    width: 100%;

    img {
      display: block;
      width: 600px;
      margin: auto;
    }
  }

  .product-name {
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    h5 {
      text-transform: capitalize;
    }

    h3 {
      font-size: 2rem;
    }
  }

  .product-details {
    grid-column: 2 / 3;
    grid-row: 2;

    table {
      width: 100%;
    }

    th {
      text-align: left;
      min-width: 110px;
    }

    tr {
      height: 30px;
    }

    td {
      padding-left: 20px;
    }
  }

  button {
    background: #111;
    border: none;
    color: #fff;
    border-radius: 50px;
    padding: 15px 0;
    grid-column: 2;
    grid-row: 2;
    height: 50px;
    align-self: center;
    margin-top: 70px;
    cursor: pointer;

    &:hover {
      opacity: 70%;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: repeat(4, auto);
    column-gap: 0;
    row-gap: 80px;

    .product-display {
      grid-column: 1;
      grid-row: 2 / 3;
    }

    .product-name {
      grid-column: 1;
      grid-row: 1 / 2;
      text-align: center;
    }

    .product-details {
      grid-column: 1;
      grid-row: 3 / 4;
    }

    button {
      grid-column: 1;
      grid-row: 4;
      margin: 0;
    }
  }
`;
