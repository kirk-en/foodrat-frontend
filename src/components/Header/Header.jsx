import "./Header.scss";
import foodRatLogo from "../../assets/concept-art/foodrat-mascot-alpha.png";
import wordMark from '../../assets/foodrat-wordmark.png'
import profileImage from "../../assets/default-profile.jpg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <img
          className="header__logo"
          src={wordMark}
          alt="a cute rat chewing on a letter C grade restaurant sign"
        />
        {/* <ul className="header__menu">
          <li className="header__menu-item">Home</li>
          <li className="header__menu-item">Thing 2</li>
          <li className="header__menu-item">Option</li>
        </ul> */}
      </div>
      <div className="header__right">
        <ul>
          <li className="header__menu-item">Swag Shop</li>
          <li className="header__menu-item">Home</li>
        </ul>
        <img className="header__profile-img" src={profileImage} alt="profile image for user" />
      </div>
    </header>
  );
};

export default Header;
