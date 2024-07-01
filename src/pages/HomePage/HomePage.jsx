import axios from "axios";
import React, { useEffect, useState } from "react";
import UserMap from "../../components/UserMap/UserMap";
import StoreList from "../../components/StoreList/StoreList";
import "./HomePage.scss";

const HomePage = () => {
  // const findLocation = async () => {
  //   res = await axios
  // }

  // console.log(window.navigator);

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
      <a onClick={() => {}}>The header can go here later</a>
      <main className="main-container">
        <aside className="main-container__left">
          <StoreList />
        </aside>
        <div className="main-container__right">
          {!location ? (
            <p>FoodRat needs your location to load map</p>
          ) : (
            // section with alert to disbale API when working with other sections
            <p>
              <b style={{ backgroundColor: "red", fontSize: "3rem" }}>
                Map API Disabled 🗺
              </b>
            </p>
            // Enable to call API and load map 👇
            // <UserMap location={location} />
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
