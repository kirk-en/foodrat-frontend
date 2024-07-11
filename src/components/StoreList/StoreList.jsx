import "./StoreList.scss";
import StoreCard from "../StoreCard/StoreCard";
import { useState } from "react";
import { alertCheck } from "../utils/helpers";
import { Link } from "react-router-dom";
import foodRatLogo from "../../assets/concept-art/foodrat-mascot-alpha.png";

const StoreList = ({ stores }) => {
  const [sort, setSort] = useState({ key: "alert", direction: "asc" });

  const nameSort = (a, b) => {
    return sort.direction === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  };
  const alertSort = (a, b) => {
    return sort.direction === "asc"
      ? alertCheck(b).length - alertCheck(a).length
      : alertCheck(a).length - alertCheck(b).length;
  };
  const gradeSort = (a, b) => {
    const gradeA = a.grade || "";
    const gradeB = b.grade || "";

    return sort.direction === "asc"
      ? gradeA.localeCompare(gradeB)
      : gradeB.localeCompare(gradeA);
  };

  const sortSwith = (key) => {
    switch (key) {
      case "name":
        return nameSort;
      case "alert":
        return alertSort;
      case "grade":
        return gradeSort;
    }
  };

  return (
    <>
      <section>
        <section className="store-list__table-head">
          <div className="store-list__table-head-left-side">
            <h2 className="store-list__title">Nearby Restaurants:</h2>
            <div className="store-list__sort">
              <span className="store-list__sort-title">Sort by:</span>
              <Link
                className={`store-list__sort-item ${
                  sort.key === "name" ? "store-list__sort-item--active" : ""
                }`}
                onClick={() =>
                  sort.key === "name" && sort.direction === "asc"
                    ? setSort({ key: "name", direction: "dsc" })
                    : setSort({ key: "name", direction: "asc" })
                }
              >
                Name
              </Link>
              <Link
                className={`store-list__sort-item ${
                  sort.key === "grade" ? "store-list__sort-item--active" : ""
                }`}
                onClick={() =>
                  sort.key === "grade" && sort.direction === "asc"
                    ? setSort({ key: "grade", direction: "dsc" })
                    : setSort({ key: "grade", direction: "asc" })
                }
              >
                Grade
              </Link>
              <Link
                className={`store-list__sort-item ${
                  sort.key === "alert" ? "store-list__sort-item--active" : ""
                }`}
                onClick={() =>
                  sort.key === "alert" && sort.direction === "asc"
                    ? setSort({ key: "alert", direction: "dsc" })
                    : setSort({ key: "alert", direction: "asc" })
                }
              >
                Alerts
              </Link>
            </div>
          </div>
          <img
            className="store-list__mobile-logo"
            src={foodRatLogo}
            alt="a cute rat chewing on a letter C grade restaurant sign"
          />
        </section>
        <div className="store-list__results">
          {stores.sort(sortSwith(sort.key)).map((store) => {
            if (store.grade !== undefined && store.name !== "undefined")
              return (
                <StoreCard store={store} key={store.violations[0].camis} />
              );
          })}
        </div>
      </section>
    </>
  );
};
export default StoreList;
