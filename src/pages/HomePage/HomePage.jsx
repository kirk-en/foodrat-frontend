import axios from "axios";
import React, { useEffect, useState } from "react";
import UserMap from "../../components/UserMap/UserMap";
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
        <div className="main-container__left">
          <p>This will be a list of restaurants</p>
        </div>
        <div className="main-container__right">
          {!location ? (
            <p>FoodRat needs your location to load map</p>
          ) : (
            <UserMap location={location} />
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
