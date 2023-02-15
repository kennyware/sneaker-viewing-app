import { StyledHero } from "./styled/Hero.styled";
import { DarkOverlay } from "./styled/DarkOverlay.styled";
import hero from "../home-hero.jpg";
import Collections from "./Collections";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goTo = () => {
    navigate("/products/?year=2022");
  };

  return (
    <>
      <StyledHero heroImgSrc={hero}>
        <div className="hero">
          <DarkOverlay />
          <button className="cta" onClick={goTo}>
            See New Releases
          </button>
        </div>
      </StyledHero>

      <h1>Collections</h1>
      <Collections />
    </>
  );
};

export default Home;
