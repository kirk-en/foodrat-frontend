import "./Header.scss";
import foodRatLogo from "../../assets/concept-art/foodrat-mascot-alpha.png";
import wordMark from "../../assets/foodrat-wordmark.png";
import profileImage from "../../assets/default-profile.jpg";

const Header = ({ search, setSearch }) => {
  return (
    <header className="header">
      <div className="header__left">
        <img
          className="header__logo"
          src={wordMark}
          alt="a cute rat chewing on a letter C grade restaurant sign"
        />
      </div>

      <div className="header__right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target.search.value);
          }}
          className="header__search"
        >
          <input
            type="text"
            name="search"
            placeholder="Search Restaurants..."
            value={search}
            onChange={(e) => {
              // console.log(e.target.value);
              setSearch(e.target.value);
            }}
            className="header__search-field"
          />
        </form>
        <nav className="header__menu">
          <ul>
            <li className="header__menu-item">Home</li>
            <li className="header__menu-item">About</li>
            <li className="header__menu-item">RatZone</li>
            <li className="header__menu-item">Swag Shop</li>
          </ul>
          <img
            className="header__profile-img"
            src={profileImage}
            alt="profile image for user"
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
