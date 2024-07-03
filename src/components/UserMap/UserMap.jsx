import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import "./UserMap.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

// The debouncer will prevent an API request being sent to NYC Open Data
// until the map has stopped moving for 1 second.
const debouncer = (func, delay, dependencies) => {
  const callback = useRef();

  useEffect(() => {
    callback.current = func;
  }, [func]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback.current();
    }, delay);

    return () => clearTimeout(handler);
  }, [...dependencies, delay]);
};

const UserMap = ({ location }) => {
  // console.log(location);
  const initBounds = {
    north: location.latitude + 0.002674456117198,
    south: location.latitude - 0.002674456117198,
    east: location.longitude + 0.00270366668701,
    west: location.longitude - 0.00270366668701,
  };
  const [bounds, setBounds] = useState(initBounds);

  const handleCameraChange = useCallback((event) => {
    setBounds(event.detail.bounds);
    console.log("bounds state:", bounds);
  });

  debouncer(
    async () => {
      console.log("GET request sent to NYC OpenData");
      const res = await axios.get(
        `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$WHERE=latitude < ${bounds.north} AND latitude > ${bounds.south} AND longitude < ${bounds.east} AND longitude > ${bounds.west}`
      );
      console.log(res.data);
    },
    1000,
    [bounds]
  );

  const loadCheck = (map) => {
    console.log("onLoad happened", map);
  };

  return (
    <>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => console.log("Maps API Loaded")}
        // could use this onload to grab data from NYC database
      >
        <Map
          // style={{ width: "100%", height: "100%" }}
          className="map"
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={18}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onCameraChanged={handleCameraChange}
        />
      </APIProvider>
    </>
  );
};

export default UserMap;
