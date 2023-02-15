import { useState, useEffect } from "react";
import { StyledSearchBar, BlurredOverlay } from "./styled/SearchBar.styled";
import { MdSearch } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { getShoes } from "../features/shoes/shoeSlice";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const { shoes } = useSelector((state) => state.shoes);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searching) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");

      if (searchText) {
        setSearchText("");
      }
    }
    if (searching) {
      if (shoes.length < 1) {
        dispatch(getShoes());
      }
    }
    const checkSize = (mediaQuery) => {
      if (mediaQuery.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    const query = window.matchMedia(`(max-width: 425px)`);

    checkSize(query);
    query.addEventListener("change", checkSize);

    return () => query.removeEventListener("change", checkSize);
  }, [searching, searchText]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (searchText) {
      navigate(`/products?q=${searchText}`);
      setSearching(false);
      e.target.querySelector("input").blur();
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);

    const filter = new RegExp(e.target.value, "i");

    setFilteredData(shoes.filter((shoe) => shoe.title.search(filter) !== -1));
  };

  const openMobileSearch = (e) => {
    if (isMobile) {
      e.preventDefault();
      setSearching(true);
    } else {
      return false;
    }
  };

  return (
    <>
      {searching && <BlurredOverlay onClick={() => setSearching(false)} />}
      <StyledSearchBar searching={searching}>
        <div className="search-container">
          {searching && (
            <>
              <Logo toggleMenu={() => setSearching(false)} />
              <button className="close-btn" onClick={() => setSearching(false)}>
                <CgClose />
              </button>
            </>
          )}
          <form onSubmit={onSubmit}>
            <button
              type="submit"
              className="search-btn"
              onClick={openMobileSearch}
            >
              <MdSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearch}
              onFocus={() => setSearching(true)}
            />
          </form>

          <div
            className={
              searching && searchText ? "search-results show" : "search-results"
            }
          >
            {filteredData.slice(0, 5).map((shoe) => (
              <Product
                item={shoe}
                key={shoe.id}
                showSaveBtn={false}
                closeSearch={() => setSearching(false)}
              />
            ))}
          </div>
        </div>
      </StyledSearchBar>
    </>
  );
};

export default SearchBar;
