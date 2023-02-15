import { StyledProduct } from "./styled/Product.styled";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveItem, unsaveItem } from "../features/auth/authSlice";

const Product = ({ item, showSaveBtn, closeSearch }) => {
  const { savedItems } = useSelector((state) => state.auth);
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    for (let i = 0; i < savedItems.length; i++) {
      if (savedItems[i].id === item.id) {
        setSaved(true);
      }
    }
  }, [savedItems, item]);

  const onClick = () => {
    if (saved) {
      dispatch(unsaveItem(item.id));
      setSaved(false);
    } else {
      dispatch(saveItem(item.id));
      setSaved(true);
    }
  };

  return (
    <StyledProduct saved={saved} onClick={closeSearch}>
      {showSaveBtn && (
        <button className="save-btn" onClick={onClick}>
          <FiHeart />
        </button>
      )}
      <Link to={`/products/${item.id}`}>
        <img src={item.media.smallImageUrl} alt="" />
        <h4>{item.shoe}</h4>
        <h5>{item.name}</h5>
        <p>${item.retailPrice}</p>
      </Link>
    </StyledProduct>
  );
};

export default Product;
