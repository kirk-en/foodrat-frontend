import { APIProvider, Map } from "@vis.gl/react-google-maps";
import "./UserMap.scss";
import { useCallback } from "react";

const UserMap = ({ location }) => {
  const handleCameraChange = useCallback((event) => {
    console.log("Updated Map Center: ", event.detail.center);
  });

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
