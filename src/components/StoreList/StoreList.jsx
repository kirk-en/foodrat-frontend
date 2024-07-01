import './StoreList.scss'
import StoreCard from "../StoreCard/StoreCard";


const StoreList = () => {
  return (
    <>
      <h1 className="store-list__title">Nearby Restaurants:</h1>
      <StoreCard />
      <StoreCard />
    </>
  );
};
export default StoreList;
