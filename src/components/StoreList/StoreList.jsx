import "./StoreList.scss";
import StoreCard from "../StoreCard/StoreCard";
import { useState } from "react";
import { alertCheck } from "../utils/helpers";
import { Link } from "react-router-dom";

const StoreList = ({ stores }) => {
  const [sort, setSort] = useState("name");

  const nameSort = (a, b) => {
    return a.name.localeCompare(b.name);
  };
  const alertSort = (a, b) => {
    return alertCheck(b).length - alertCheck(a).length;
  };
  return (
    <>
      <h2 className="store-list__title">Nearby Restaurants:</h2>
      <div className="store-list__sort">
        <span className="store-list__sort-title">Sort:</span>
        <Link className="store-list__sort-item" onClick={() => setSort("name")}>
          Name
        </Link>
        <Link
          className="store-list__sort-item"
          onClick={() => setSort("alert")}
        >
          Alerts
        </Link>
      </div>
      {stores.sort(sort === "name" ? nameSort : alertSort).map((store) => {
        if (store.grade !== undefined)
          return <StoreCard store={store} key={store.violations[0].camis} />;
      })}
    </>
  );
};
export default StoreList;
