import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserMapRatZone from "../../components/UserMapRatZone/UserMapRatZone";
// import StoreList from "../../components/StoreList/StoreList";
// import StoreDetails from "../../components/StoreDetails/StoreDetails";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import GameResult from "../../components/GameResult/GameResult";
import StoreDetails from "../../components/StoreDetails/StoreDetails";
import {
  getLocation,
  getStoreById,
  ratZone,
} from "../../components/utils/helpers";
import ratzoneLogo from "../../assets/game/ratzone-alt.png";
import ratzoneRat from "../../assets/game/ratzone-mascot-2.png";
import { Link } from "react-router-dom";

import "./RatZonePage.scss";

// set this location if the user declines to use location sharing
const defaultLocation = {
  latitude: 40.720720183542,
  longitude: -73.988888639603,
  altitude: null,
  accuracy: 40,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
};

const RatZonePage = () => {
  const [location, setLocation] = useState();
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState();
  const [radar, setRadar] = useState(false);
  const [playerScore, setPlayerScore] = useState(undefined);
  const { storeId } = useParams();
  const { result } = useParams();
  // ask for user location on page load
  useEffect(() => {
    getLocation(setLocation, defaultLocation, () => {});
  }, []);
  // we may want to put a variable inside the dependency array that reruns the use effect when the map moves
  useEffect(() => {
    setSelectedStore(getStoreById(stores, storeId));
  }, [storeId]);
  return (
    <>
      <Header search={search} setSearch={setSearch} setStores={setStores} />
      <div className="ratzone-container__logo">
        <img
          style={{ transform: "scaleX(-1)" }}
          src={ratzoneRat}
          alt="a cute cartoon rat eating"
        />
        <img
          src={ratzoneLogo}
          alt="the words ratzone in army style typography"
        />
        <img src={ratzoneRat} alt="a cute cartoon rat eating" />
        {/* <p>(Early Access v0.1)</p> */}
      </div>
      <main className="ratzone-container">
        {result && (
          <GameResult
            playerScore={playerScore}
            radar={radar}
            className="store-details"
          />
        )}
        <section className="ratzone-container__full-width-map">
          {!location ? (
            <div className="ratzone-container__loading-text">
              <p>Loading Map + Finding location... 🌎</p>
            </div>
          ) : (
            <UserMapRatZone
              location={location}
              stores={stores}
              setStores={setStores}
              radar={radar}
            />
          )}
        </section>
      </main>
      <footer className="ratzone-footer">
        <Link
          onClick={() => {
            setRadar(true);
            console.log("radar on");
          }}
          className={`ratzone-footer__btn ${
            radar ? "ratzone-footer__btn--radar-on" : ""
          }`}
        >
          <p>
            Use Rat Radar UAV{" "}
            <span className="ratzone-footer__detail"> (Final Score -5%)</span>
          </p>
        </Link>
        <Link
          to={"/ratzone/result"}
          onClick={() => {
            console.log("init ratZone play");
            setPlayerScore(ratZone(stores, radar));
          }}
          className="ratzone-footer__btn ratzone-footer__btn--drop"
        >
          Drop In!
        </Link>
      </footer>
    </>
  );
};

export default RatZonePage;
