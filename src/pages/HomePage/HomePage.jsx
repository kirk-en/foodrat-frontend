import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserMap from "../../components/UserMap/UserMap";
import StoreList from "../../components/StoreList/StoreList";
import StoreDetails from "../../components/StoreDetails/StoreDetails";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { getLocation, getStoreById } from "../../components/utils/helpers";

import "./HomePage.scss";

// set this location if the user declines to use location sharing
const defaultLocation = {
  latitude: 40.720720183542,
  longitude: -73.988888639603,
  altitude: null,
  accuracy: 40,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
};

const HomePage = () => {
  const [location, setLocation] = useState();
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState();
  const [supportedRegion, setSupportedRegion] = useState(true);
  const { storeId } = useParams();
  // ask for user location on page load
  useEffect(() => {
    getLocation(setLocation, defaultLocation, setSupportedRegion);
  }, []);
  // we may want to put a variable inside the dependency array that reruns the use effect when the map moves
  useEffect(() => {
    setSelectedStore(getStoreById(stores, storeId));
  }, [storeId]);
  return (
    <>
      <Header search={search} setSearch={setSearch} setStores={setStores} />
      <main className="main-container">
        {selectedStore && (
          <StoreDetails
            selectedStore={selectedStore}
            className="store-details"
          />
        )}
        <aside className="main-container__left">
          <StoreList stores={stores} />
        </aside>
        <section className="main-container__right">
          {!location ? (
            <div className="main-container__loading-text">
              <p>Loading Map + Finding location 🌎</p>
            </div>
          ) : (
            // 🟠 section with alert to disbale API when working with other sections
            // <p>
            //   <b style={{ backgroundColor: "red", fontSize: "3rem" }}>
            //     Map API Currently Disabled 🗺
            //   </b>
            // </p>
            // 🟠 Enable to call API and load map 👇
            // Noting here that passing down the setStores state setting function could hurt reusability of <UserMap> component
            <UserMap
              location={location}
              stores={stores}
              setStores={setStores}
            />
          )}
        </section>
      </main>
      <Footer supportedRegion={supportedRegion} />
    </>
  );
};

export default HomePage;
