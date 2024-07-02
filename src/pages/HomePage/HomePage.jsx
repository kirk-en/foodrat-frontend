import axios from "axios";
import React, { useEffect, useState } from "react";

import UserMap from "../../components/UserMap/UserMap";
import StoreList from "../../components/StoreList/StoreList";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import "./HomePage.scss";

const HomePage = () => {
  const [location, setLocation] = useState();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
    });
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
            // section with alert to disbale API when working with other sections
            // <p>
            //   <b style={{ backgroundColor: "red", fontSize: "3rem" }}>
            //     Map API Currently Disabled 🗺
            //   </b>
            // </p>
            // Enable to call API and load map 👇
            <UserMap location={location} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
