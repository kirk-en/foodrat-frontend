import axios from "axios";
import React, { useEffect, useState } from "react";

import UserMap from "../../components/UserMap/UserMap";
import StoreList from "../../components/StoreList/StoreList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import "./HomePage.scss";

// set this location if the user declines to use location sharing
const defaultLocation = {
  latitude: 40.690454399970044,
  longitude: -74.04516135490462,
  altitude: null,
  accuracy: 40,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
};

const HomePage = () => {
  const [location, setLocation] = useState();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position:", position);
        setLocation(position.coords);
      },
      () => {
        setLocation(defaultLocation);
      }
    );
  };

  useEffect(() => {
    getLocation();
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
          <StoreList />
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
            <UserMap location={location} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
