import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import "./UserMap.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import markerImageA from "../../assets/letter-grades/grade-a.svg";
import markerImageB from "../../assets/letter-grades/grade-b.svg";

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
      const { data } = await axios.get(
        `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$WHERE=latitude < ${bounds.north} AND latitude > ${bounds.south} AND longitude < ${bounds.east} AND longitude > ${bounds.west}`
      );
      console.log(data);
    },
    1000,
    [bounds]
  );

  return (
    <>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        onLoad={() => console.log("Maps API Loaded")}
        // could use this onload to grab data from NYC database
      >
        <Map
          mapId="foodrat"
          style={{ width: "100%", height: "100%" }}
          className="map"
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={18}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onCameraChanged={handleCameraChange}
        >
          <AdvancedMarker
            title="Store 1"
            position={{ lat: 40.724261421332, lng: -73.9966159052 }}
            onClick={() => console.log("marker clicked")}
          >
            <p>This is a store</p>
            <img src={markerImageA} width={32} height={32} />
          </AdvancedMarker>
          <AdvancedMarker
            title="Store 1"
            position={{ lat: 40.722979589862, lng: -73.995843921175 }}
            onClick={() => console.log("marker clicked")}
          >
            <img src={markerImageB} width={32} height={32} />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </>
  );
};

export default UserMap;
