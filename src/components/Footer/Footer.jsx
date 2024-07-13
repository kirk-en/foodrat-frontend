import foodRatLogo from "../../assets/concept-art/foodrat-mascot-alpha.png";
import "./Footer.scss";

const Footer = ({ supportedRegion }) => {
  return (
    <footer className="footer">
      {!supportedRegion && (
        <div className="footer__error-message">
          <p>
            FoodRat will be coming to your area soon! Until then, check out the
            NYC map to get a feel for the app!
          </p>
        </div>
      )}
      <img
        className="footer__logo"
        src={foodRatLogo}
        alt="a cute rat chewing on a letter C grade restaurant sign"
      />
    </footer>
  );
};

export default Footer;
