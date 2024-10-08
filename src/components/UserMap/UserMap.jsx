import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  CollisionBehavior,
} from "@vis.gl/react-google-maps";
import "./UserMap.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import markerImageA from "../../assets/letter-grades/grade-a.svg";
import markerImageB from "../../assets/letter-grades/grade-b.svg";
import markerImageC from "../../assets/letter-grades/grade-c.svg";
import markerImagePending from "../../assets/letter-grades/grade-pending.svg";
import markerImageTBD from "../../assets/letter-grades/grade-tbd.svg";
import markerImageClosed from "../../assets/letter-grades/grade-closed.svg";
import { groupByStore, debouncer } from "../utils/helpers";
import { Link } from "react-router-dom";

const UserMap = ({ location, stores, setStores }) => {
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

  const handleCameraChange = useCallback((event) => {
    setBounds(event.detail.bounds);
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
        }&$ORDER=inspection_date DESC&$$app_token=${
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
          mapId="9061d7edc09b5a47"
          style={{ width: "100%", height: "100%" }}
          className="map"
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={18}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onCameraChanged={handleCameraChange}
        >
          {stores.map((store, index) => {
            if (
              store.name !== "undefined" &&
              store.grade !== undefined &&
              index < 200
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
                  onClick={() =>
                    console.log(
                      `lat - ${store.coords.latitude} | long - ${
                        store.coords.longitude
                      } | ${store.name} - ${store.grade} Grade, ${
                        store.violations[0].score
                          ? store.violations[0].score
                          : "N/A"
                      } points`
                    )
                  }
                >
                  <Link
                    className="card__link"
                    to={`/store/${store.violations[0].camis}`}
                  >
                    <div className="map__store">
                      <img
                        src={gradeImages[store.grade]}
                        width={25}
                        height={25}
                        className="map__grade"
                      />
                      <span
                        className="map__business-name"
                        style={{ width: store.markerWidth + 17 }}
                      >
                        {store.name.length > 25
                          ? store.name.substring(0, 20) + "..."
                          : store.name}
                      </span>
                    </div>
                  </Link>
                </AdvancedMarker>
              );
            } else return;
          })}
          {/* <AdvancedMarker
            title="Store 1"
            position={{ lat: 40.722979589862, lng: -73.995843921175 }}
            onClick={() => console.log("marker clicked")}
          >
            <img src={markerImageB} width={32} height={32} />
          </AdvancedMarker> */}
        </Map>
      </APIProvider>
    </>
  );
};

export default UserMap;
