import "./Header.scss";
import foodRatLogo from "../../assets/concept-art/foodrat-mascot-alpha.png";
import wordMark from "../../assets/foodrat-wordmark.png";
import profileImage from "../../assets/default-profile.jpg";
import axios from "axios";
import { groupByStore } from "../utils/helpers";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch, setStores }) => {
  const storeSearch = async () => {
    console.log("FoodRat Search sent to NYC OpenData:", search);
    const { data } = await axios.get(
      `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$WHERE=dba LIKE '%25${search.toUpperCase()}%25' &$$app_token=${
        import.meta.env.VITE_NYC_APP_TOKEN
      }`
    );
    // Sort violations from newest to oldest
    const sortedData = data.sort((a, b) => {
      return new Date(b.inspection_date) - new Date(a.inspection_date);
    });
    // console.log(sortedData);
    setStores(groupByStore(sortedData));
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to={"/"}>
          <img
            className="header__logo"
            src={wordMark}
            alt="a cute rat chewing on a letter C grade restaurant sign"
          />
        </Link>
      </div>

      <div className="header__right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target.search.value);
            setSearch(e.target.search.value);
            storeSearch();
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
            <li className="header__menu-item">
              <Link to={"/ratzone"}>RatZone</Link>
            </li>
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
