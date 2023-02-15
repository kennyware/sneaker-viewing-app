import { StyledProductDisplay } from "./styled/ProductDisplay.styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { getSingleShoe, reset } from "../features/shoes/shoeSlice";
import { saveItem, unsaveItem } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDisplay = () => {
  const { shoe: item, isLoading } = useSelector((state) => state.shoes);
  const { savedItems } = useSelector((state) => state.auth);
  const [isSaved, setIsSaved] = useState(false);

  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch single product data from api
    dispatch(getSingleShoe(id));

    return () => {
      dispatch(reset());
    };
  }, [id, dispatch]);

  useEffect(() => {
    const checkIfSaved = () => {
      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].id === id) {
          setIsSaved(true);
        }
      }
    };

    checkIfSaved();
  }, [savedItems, id]);

  // Function to convert product release date from "YYYY-MM-DD" to "DD/MM/YYYY"
  const convertDate = (inputFormat) => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  };

  const changeSaveState = () => {
    if (isSaved) {
      dispatch(unsaveItem(id));
      setIsSaved(false);
    } else {
      dispatch(saveItem(id));
      setIsSaved(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledProductDisplay>
      {Object.keys(item).length > 0 ? (
        <>
          <div className="product-display">
            <img src={item.media.imageUrl} alt="" />
          </div>
          <div className="product-name">
            <h5>{item.brand}</h5>
            <h3>{item.name}</h3>
          </div>
          <div className="product-details">
            <table>
              <tbody>
                <tr>
                  <th>Retail Price: </th>
                  <td>${item.retailPrice}</td>
                </tr>
                <tr>
                  <th>Release Date: </th>
                  <td>{convertDate(item.releaseDate)}</td>
                </tr>
                <tr>
                  <th>Colorway: </th>
                  <td>{item.colorway}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={changeSaveState}>
            {isSaved ? "Unsave" : "Save"}
          </button>
        </>
      ) : (
        <Loader />
      )}
    </StyledProductDisplay>
  );
};

export default ProductDisplay;
