import { APIProvider, Map } from "@vis.gl/react-google-maps";
import "./UserMap.scss";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [bounds, setBounds] = useState({});

  const handleCameraChange = useCallback((event) => {
    setBounds(event.detail.bounds);
    console.log(bounds);
  });

  debouncer(
    () => {
      console.log("GET request sent to NYC OpenData");
    },
    1500,
    [bounds]
  );

  return (
    <>
      {/* <p>
        this is the map! The user is currently at {location.latitude},{" "}
        {location.longitude}.
      </p> */}
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
