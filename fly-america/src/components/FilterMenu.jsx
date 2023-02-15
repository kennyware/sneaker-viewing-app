import {
  StyledFilterMenu,
  FilterCategory,
  DarkOverlay,
  ColorBox,
} from "./styled/FilterMenu.styled";
import { CgClose } from "react-icons/cg";
import { HiChevronDown } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const FilterMenu = ({
  brands,
  toggleMenu,
  open,
  filterByBrand,
  filterByColor,
  filterByPrice,
  clearFilters,
}) => {
  const dispatch = useDispatch();
  const colors = [
    "yellow",
    "red",
    "blue",
    "green",
    "orange",
    "white",
    "black",
    "grey",
    "brown",
  ];

  const [toggleBrands, setToggleBrands] = useState(true);
  const [toggleColors, setToggleColors] = useState(false);
  const [togglePrices, setTogglePrices] = useState(false);

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      return () => {
        didMount.current = true;
      };
    }
  }, [dispatch]);

  const handleBrandChange = (e) => {
    filterByBrand(e.target.value);
  };

  const handleColorChange = (e) => {
    filterByColor(e.target.value);
  };

  const handlePriceChange = (e) => {
    filterByPrice(e.target.value);
  };

  const handleClearBtnClick = () => {
    clearFilters();

    let checkBoxes = document.querySelectorAll("input[type=checkbox]");

    checkBoxes.forEach((checkBox) => (checkBox.checked = false));
  };

  return (
    <>
      <DarkOverlay onClick={toggleMenu} open={open} />
      <StyledFilterMenu open={open}>
        <div className="heading">
          <h2>Filter</h2>
          <button onClick={toggleMenu}>
            <CgClose />
          </button>
        </div>
        <p className="filter-clear" onClick={handleClearBtnClick}>
          Clear Filters
        </p>
        <FilterCategory className="brands" toggleCategory={toggleBrands}>
          <div className="heading">
            <h4>Brand</h4>
            <button onClick={() => setToggleBrands(!toggleBrands)}>
              <HiChevronDown />
            </button>
          </div>
          <div className="filter-group">
            {brands.length > 0 &&
              brands.map((brand) => {
                return (
                  <div key={brand} className="brand">
                    <input
                      type="checkbox"
                      id={brand}
                      value={brand}
                      onChange={handleBrandChange}
                    />
                    <label htmlFor={brand}>{brand}</label>
                  </div>
                );
              })}
          </div>
        </FilterCategory>
        <FilterCategory className="colors" toggleCategory={toggleColors}>
          <div className="heading">
            <h4>Color</h4>
            <button onClick={() => setToggleColors(!toggleColors)}>
              <HiChevronDown />
            </button>
          </div>
          <div className="colors-container filter-group">
            {colors.map((color) => (
              <ColorBox
                key={color}
                color={color}
                value={color}
                onChange={handleColorChange}
                type="checkbox"
              />
            ))}
          </div>
        </FilterCategory>
        <FilterCategory className="prices" toggleCategory={togglePrices}>
          <div className="heading">
            <h4>Price</h4>
            <button onClick={() => setTogglePrices(!togglePrices)}>
              <HiChevronDown />
            </button>
          </div>
          <div className="filter-group">
            <div className="price">
              <input
                type="checkbox"
                name=""
                id="0to25"
                value="0,25"
                onChange={handlePriceChange}
              />
              <label htmlFor="0to25">Up to $25</label>
            </div>
            <div className="price">
              <input
                type="checkbox"
                name=""
                id="25to50"
                value="25,50"
                onChange={handlePriceChange}
              />
              <label htmlFor="25to100">$25 to $50</label>
            </div>
            <div className="price">
              <input
                type="checkbox"
                name=""
                id="50to100"
                value="50,100"
                onChange={handlePriceChange}
              />
              <label htmlFor="50to100">$50 to $100</label>
            </div>
            <div className="price">
              <input
                type="checkbox"
                name=""
                id="100to200"
                value="100,200"
                onChange={handlePriceChange}
              />
              <label htmlFor="100to200">$100 to $200</label>
            </div>
            <div className="price">
              <input
                type="checkbox"
                name=""
                id="200up"
                value="200,100000000"
                onChange={handlePriceChange}
              />
              <label htmlFor="200up">$200 &amp; above</label>
            </div>
          </div>
        </FilterCategory>
      </StyledFilterMenu>
    </>
  );
};

export default FilterMenu;
