import "./Loader.scss";
import foodRatLogo from "../../assets/concept-art/foodrat-mascot-alpha.png";

const Loader = () => {
  return (
    <div className="loader">
      <img
        className="loader__mascot"
        src={foodRatLogo}
        alt="loading"
      />
      <p className="loader__text">Sniffing out ratings...</p>
    </div>
  );
};

export default Loader;
