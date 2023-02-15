import { StyledCollections } from "./styled/Collections.styled";
import mensFeatureImg from "../mens-feature.jpg";
import womensFeatureImg from "../womens-feature.jpg";
import kidsFeatureImg from "../kids-feature.jpg";
import { Link } from "react-router-dom";

const Collections = () => {
  return (
    <StyledCollections>
      <div>
        <Link to="/products/?gender=men">
          <img src={mensFeatureImg} alt="feature with a man sitting" />
          <p>Men's</p>
        </Link>
      </div>

      <div>
        <Link to="/products/?gender=women">
          <img src={womensFeatureImg} alt="feature with a women sitting" />
          <p>Women's</p>
        </Link>
      </div>

      <div>
        <Link to="/products/?gender=child,preschool,toddler">
          <img src={kidsFeatureImg} alt="feature with a toy and a shoe" />
          <p>Kid's</p>
        </Link>
      </div>
    </StyledCollections>
  );
};

export default Collections;
