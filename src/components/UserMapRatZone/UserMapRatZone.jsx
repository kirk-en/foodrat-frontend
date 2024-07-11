import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  CollisionBehavior,
} from "@vis.gl/react-google-maps";
import "./UserMapRatZone.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import markerImageA from "../../assets/letter-grades/grade-a.svg";
import markerImageB from "../../assets/letter-grades/grade-b.svg";
import markerImageC from "../../assets/letter-grades/grade-c.svg";
import markerImagePending from "../../assets/letter-grades/grade-pending.svg";
import markerImageTBD from "../../assets/letter-grades/grade-tbd.svg";
import markerImageClosed from "../../assets/letter-grades/grade-closed.svg";
import { groupByStore, debouncer, calculateBounds } from "../utils/helpers";
import { Link } from "react-router-dom";
import { Circle } from "../Circle/Circle";

const UserMapRatZone = ({ location, stores, setStores, radar }) => {
  const map = useMap();

  const initBounds = {
    north: location.latitude + 0.002674456117198,
    south: location.latitude - 0.002674456117198,
    east: location.longitude + 0.00270366668701,
    west: location.longitude - 0.00270366668701,
  };
  const gradeImages = {
    A: markerImageA,
    B: markerImageB,
    C: markerImageC,
    Z: markerImagePending,
    N: markerImageTBD,
    CLOSED: markerImageClosed,
  };
  const [bounds, setBounds] = useState(initBounds);
  const [circleCenter, setCircleCenter] = useState(location);

  const handleCameraChange = useCallback((event) => {
    setCircleCenter(event.detail.center);
    setBounds(
      calculateBounds(event.detail.center.lat, event.detail.center.lng, 200)
    );
    // console.log("bounds state:", bounds);
  });

  debouncer(
    async () => {
      console.log("GET request sent to NYC OpenData");
      const { data } = await axios.get(
        `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$WHERE=latitude < ${
          bounds.north
        } AND latitude > ${bounds.south} AND longitude < ${
          bounds.east
        } AND longitude > ${
          bounds.west
        }&$ORDER=inspection_date DESC&$limit=20000&$$app_token=${
          import.meta.env.VITE_NYC_APP_TOKEN
        }`
      );

      setStores(groupByStore(data));
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
          mapId="eae09cf913facb8f"
          style={{ width: "100%", height: "100%" }}
          className="map"
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={14}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onCameraChanged={handleCameraChange}
        >
          <Circle
            radius={200}
            center={circleCenter}
            strokeColor={"#0c4cb3"}
            strokeOpacity={1}
            strokeWeight={3}
            fillColor={"#3b82f6"}
            fillOpacity={0.3}
          />

          {stores.map((store, index, arr) => {
            let uavChance = radar
              ? Math.floor(Math.random() * arr.length) / 5
              : 0;
            if (
              store.name !== "undefined" &&
              store.grade !== undefined &&
              index < uavChance
            ) {
              return (
                <AdvancedMarker
                  key={store.violations[0].camis}
                  title={store.name}
                  position={
                    store.coords.latitude &&
                    store.coords.longitude &&
                    !isNaN(Number(store.coords.latitude)) &&
                    !isNaN(Number(store.coords.longitude))
                      ? {
                          lat: Number(store.coords.latitude),
                          lng: Number(store.coords.longitude),
                        }
                      : {
                          lat: 0,
                          lng: 0,
                        }
                  }
                  collisionBehavior={
                    CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY
                  }
                  onClick={() => console.log(`Rat UAV!`)}
                >
                  <div className="map__uav-mark"></div>
                </AdvancedMarker>
              );
            } else return;
          })}
        </Map>
      </APIProvider>
    </>
  );
};

export default UserMapRatZone;
