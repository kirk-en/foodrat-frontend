import "./StoreList.scss";
import StoreCard from "../StoreCard/StoreCard";

const StoreList = ({ stores }) => {
  return (
    <>
      <h1 className="store-list__title">Nearby Restaurants:</h1>
      {stores.map((store) => {
        // console.log(store.name);
        return <StoreCard store={store} key={store.violations[0].camis} />;
      })}
    </>
  );
};
export default StoreList;
