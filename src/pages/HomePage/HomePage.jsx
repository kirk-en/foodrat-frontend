import axios from "axios";
import React, { useEffect, useState } from "react";

import UserMap from "../../components/UserMap/UserMap";
import StoreList from "../../components/StoreList/StoreList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getLocation } from "../../components/utils/helpers";

import "./HomePage.scss";

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

const HomePage = () => {
  const [location, setLocation] = useState();
  const [stores, setStores] = useState([]);

  // ask for user location on page load
  useEffect(() => {
    getLocation(setLocation, defaultLocation);
  }, []);
  // we may want to put a variable inside the dependency array that reruns the use effect when the map moves
  useEffect(() => {
    if (location) console.log(location);
  }, [location]);
  return (
    <>
      <Header />
      <main className="main-container">
        <aside className="main-container__left">
          <StoreList stores={stores} />
        </aside>
        <section className="main-container__right">
          {!location ? (
            <p>FoodRat needs your location to load map</p>
          ) : (
            // 🟠 section with alert to disbale API when working with other sections
            // <p>
            //   <b style={{ backgroundColor: "red", fontSize: "3rem" }}>
            //     Map API Currently Disabled 🗺
            //   </b>
            // </p>
            // 🟠 Enable to call API and load map 👇
            // Noting here that passing down the setStores state setting function could hurt reusability of <UserMap> component
            <UserMap
              location={location}
              stores={stores}
              setStores={setStores}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
