import "./StoreList.scss";
import StoreCard from "../StoreCard/StoreCard";
import { useParams } from "react-router-dom";
import StoreDetails from "../StoreDetails/StoreDetails";

const StoreList = ({ stores }) => {
  const { storeId } = useParams();

  storeId && console.log("param active:", storeId);

  return (
    <>
      <h1 className="store-list__title">Nearby Restaurants:</h1>
      {storeId && <StoreDetails />}
      {stores.map((store) => {
        // console.log(store.name);
        return <StoreCard store={store} key={store.violations[0].camis} />;
      })}
    </>
  );
};
export default StoreList;
