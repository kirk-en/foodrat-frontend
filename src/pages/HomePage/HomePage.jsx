import axios from "axios";
import React, { useEffect, useState } from "react";
import UserMap from "../../components/UserMap/UserMap";
import './HomePage.scss'

const HomePage = () => {
  // const findLocation = async () => {
  //   res = await axios
  // }

  // console.log(window.navigator);

  const [location, setLocation] = useState();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
      console.log(location);
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
  // we may want to put a variable inside the dependency array that reruns the use effect when the map moves

  return (
    <>
      <a onClick={() => {}}>The header can go here later</a>
      <main className="main-container">
        <p>This will be a list of restaurants</p>
        {!location ? <p>FoodRat needs your location to load map</p> : <UserMap location={location}/>}
      </main>
    </>
  );
};

export default HomePage;