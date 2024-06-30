import axios from "axios";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  // const findLocation = async () => {
  //   res = await axios
  // }

  // console.log(window.navigator);

  const [location, setLocation] = useState({});

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
      <div>HomePage</div>
      <a onClick={() => {}}>wooooo</a>
    </>
  );
};

export default HomePage;