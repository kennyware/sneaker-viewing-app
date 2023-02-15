import Product from "./Product";
import { StyledBag } from "./styled/Bag.styled";
import { StyledProductsGrid } from "./styled/ProductSection.styled";
import Loader from "./Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedItems } from "../features/auth/authSlice";

const Bag = () => {
  const dispatch = useDispatch();
  const { isLoading, savedItems } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSavedItems());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <StyledBag>
      <h1>Saved Items</h1>
      {savedItems.length > 0 ? (
        <StyledProductsGrid>
          {savedItems.map((item) => {
            return <Product key={item.id} item={item} saved={true} />;
          })}
        </StyledProductsGrid>
      ) : (
        <p>You do not have any sneakers saved.</p>
      )}
    </StyledBag>
  );
};

export default Bag;
