import { APIProvider, Map } from "@vis.gl/react-google-maps";

const UserMap = ({ location }) => {
  return (
    <>
      <p>
        this is the map! The user is currently at {location.latitude},{" "}
        {location.longitude}.
      </p>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          defaultZoom={18}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </>
  );
};

export default UserMap;
