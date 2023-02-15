import Filter from "./Filter";
import { StyledSorter } from "./styled/Sorter.styled";
import { StyledOptions } from "./styled/Options.styled";
import { HiChevronDown } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import {
  sortByPiceHighToLow,
  sortByPiceLowToHigh,
  sortByNewest,
} from "../features/shoes/shoeSlice";

const Options = ({ toggleMenu }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState("");
  const [dropped, setDropped] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const hasAncestor = (ancestor, current) => {
      // const list = []

      while (current) {
        if (current.className === ancestor) return true;
        current = current.parentElement;
      }

      return false;
    };

    const handleOutClick = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        !hasAncestor("header", e.target)
      ) {
        setDropped(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleOutClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, [containerRef]);

  const changeSort = (e) => {
    switch (e.target.getAttribute("value")) {
      case "newest": {
        dispatch(sortByNewest());
        setOptions(e.target.innerHTML);
        setDropped(false);
        break;
      }
      case "hightolow": {
        dispatch(sortByPiceHighToLow());
        setOptions(e.target.innerHTML);
        setDropped(false);
        break;
      }
      case "lowtohigh": {
        dispatch(sortByPiceLowToHigh());
        setOptions(e.target.innerHTML);
        setDropped(false);
        break;
      }
      default: {
        break;
      }
    }
  };

  const toggleDropdown = () => {
    setDropped(!dropped);
  };

  return (
    <StyledOptions>
      <Filter toggleMenu={toggleMenu} />
      <StyledSorter>
        <div className="dropdown">
          <div className="header" onClick={toggleDropdown}>
            Sort By: <span>{options}</span>
            <HiChevronDown />
          </div>
          {dropped && (
            <div className="dropdown-container" ref={containerRef}>
              <div className="dropdown-options">
                <div onClick={changeSort} value="newest">
                  Newest
                </div>
                <div onClick={changeSort} value="lowtohigh">
                  Price: Low to High
                </div>
                <div onClick={changeSort} value="hightolow">
                  Price: High to Low
                </div>
              </div>
            </div>
          )}
        </div>
      </StyledSorter>
    </StyledOptions>
  );
};

export default Options;
