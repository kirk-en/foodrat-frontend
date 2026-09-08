import "./Header.scss";
import foodRatLogo from "../../assets/concept-art/foodrat-mascot-alpha.png";
import wordMark from "../../assets/foodrat-wordmark.png";
import profileImage from "../../assets/default-profile.jpg";
import axios from "axios";
import { useRef } from "react";
import { groupByStore } from "../utils/helpers";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch, setStores, setLoading }) => {
  const searchInputRef = useRef(null);
  // iOS's "Done" keyboard accessory button blurs the input without firing
  // a form submit, so we run the search on blur too. This flag stops that
  // from double-firing when the blur was caused by our own submit handler.
  const skipNextBlurSearch = useRef(false);

  const storeSearch = async () => {
    // console.log("FoodRat Search sent to NYC OpenData:", search);
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$WHERE=dba LIKE '%25${search.toUpperCase()}%25' &$$app_token=${
          import.meta.env.VITE_NYC_APP_TOKEN
        }`
      );
      // Sort violations from newest to oldest
      const sortedData = data.sort((a, b) => {
        return new Date(b.inspection_date) - new Date(a.inspection_date);
      });
      console.log(sortedData);
      setStores(groupByStore(sortedData));
    } finally {
      setLoading(false);
    }
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
            skipNextBlurSearch.current = true;
            searchInputRef.current?.blur();
          }}
          className="header__search"
        >
          <input
            ref={searchInputRef}
            type="search"
            enterKeyHint="search"
            name="search"
            placeholder="Search Restaurants..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onBlur={() => {
              if (skipNextBlurSearch.current) {
                skipNextBlurSearch.current = false;
                return;
              }
              if (search.trim()) storeSearch();
            }}
            className="header__search-field"
          />
        </form>
        <nav className="header__menu">
          <ul>
            <li className="header__menu-item">
              <Link to={"/"} className="header__menu-link">
                Home
              </Link>
            </li>
            <li className="header__menu-item">
              <Link className="header__menu-link" to={"/about"}>
                About
              </Link>
            </li>
            <li className="header__menu-item">
              <Link to={"/ratzone"} className="header__menu-link">
                RatZone
              </Link>
            </li>
            {/* <li className="header__menu-item">
              <Link className="header__menu-link">Swag Shop</Link>
            </li> */}
          </ul>
          {/* <img
            className="header__profile-img"
            src={profileImage}
            alt="profile image for user"
          /> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
