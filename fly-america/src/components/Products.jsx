import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "./Product";
import {
  StyledProductsGrid,
  StyledProductsHeading,
} from "./styled/ProductSection.styled";
import Options from "./Options";
import FilterMenu from "./FilterMenu";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { getShoes, reset, searchShoes } from "../features/shoes/shoeSlice";
import { createSelector } from "@reduxjs/toolkit";

// check data for color specified by the "color" filter
const checkColor = (shoeColor, filters) => {
  if (filters.length > 0) {
    let regEx;

    for (let i = 0; i < filters.length; i++) {
      regEx = new RegExp(filters[i], "i");
      if (shoeColor.search(regEx) !== -1) return true;
    }
    return false;
  } else return true;
};

// check data for brand specified by the "brand" filter
const checkBrands = (brand, filters) => {
  if (filters.length > 0 && !filters.includes(brand)) return false;
  else return true;
};

// check data for price specified by the "price" filter
const checkPrice = (price, filters) => {
  if (filters.length > 0) {
    for (const pair of filters) {
      const [min, max] = pair;

      if (price >= min && price <= max) {
        return true;
      }
    }
    return false;
  }
  return true;
};

// create selector to hold data for filtered shoes
const selectFilteredShoes = createSelector(
  (state) =>
    state.shoes.searched.length > 0 ? state.shoes.searched : state.shoes.shoes,
  (_, filters) => filters,
  (shoes, filters) => {
    return shoes.filter((shoe) => {
      if (
        checkBrands(shoe.brand, filters["brands"]) &&
        checkColor(shoe.colorway, filters["colors"]) &&
        checkPrice(shoe.retailPrice, filters["price"])
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
);

export const FilteredShoes = (filters) => {
  const list = useSelector((state) => selectFilteredShoes(state, filters));

  return list;
};

const Products = () => {
  const dispatch = useDispatch();

  const { shoes, brands, isError, isLoading, message, searched } = useSelector(
    (state) => state.shoes
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    colors: [],
    price: [],
  });

  const filteredShoes = FilteredShoes(filters);

  let [searchParams] = useSearchParams();
  const gender = searchParams.get("gender");
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (gender) {
      dispatch(getShoes(gender));
    } else {
      dispatch(getShoes());
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, gender]);

  useEffect(() => {
    if (searchQuery && shoes.length > 0) {
      dispatch(searchShoes(searchQuery));
    }
  }, [dispatch, shoes, searchQuery]);

  // toggle filter menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (isLoading || brands.length < 1 || shoes.length < 1) {
    return <Loader />;
  }

  // Add filters from filter menu to state
  const filterByBrand = (newFilter) => {
    if (!filters["brands"].includes(newFilter)) {
      setFilters((prevState) => ({
        ...prevState,
        brands: [...prevState.brands, newFilter],
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        brands: filters["brands"].filter((filter) => filter !== newFilter),
      }));
    }
  };

  // Add filters from filter menu to state
  const filterByColor = (newFilter) => {
    if (!filters["colors"].includes(newFilter)) {
      setFilters((prevState) => ({
        ...prevState,
        colors: [...prevState.colors, newFilter],
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        colors: filters["colors"].filter((filter) => filter !== newFilter),
      }));
    }
  };

  // Add filters from filter menu to state
  const filterByPrice = (newFilter) => {
    if (!filters["price"].toString().includes(newFilter)) {
      setFilters((prevState) => ({
        ...prevState,
        price: [...prevState.price, newFilter.split(",").map((item) => +item)],
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        price: filters["price"].filter(
          (filter) => filter.toString() !== newFilter
        ),
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      colors: [],
      price: [],
    });
  };

  return (
    <>
      <StyledProductsHeading>
        <div className="label">
          {searched.length > 0 ? (
            <>
              <p>Search results for</p>
              <h2>
                {searchQuery} &#40;{searched.length}&#41;
              </h2>
            </>
          ) : (
            <h2>{gender && <span>{gender}s</span>} Shoes</h2>
          )}
        </div>
        <Options toggleMenu={toggleMenu} />
      </StyledProductsHeading>

      <FilterMenu
        brands={brands}
        toggleMenu={toggleMenu}
        open={menuOpen}
        filterByBrand={filterByBrand}
        filterByColor={filterByColor}
        filterByPrice={filterByPrice}
        clearFilters={clearFilters}
      />

      <StyledProductsGrid>
        {filteredShoes.length > 0 ? (
          filteredShoes.map((shoe) => <Product key={shoe.id} item={shoe} />)
        ) : (
          <p>No Items Filtered</p>
        )}
      </StyledProductsGrid>
    </>
  );
};

export default Products;
