import "./StoreCard.scss";
import markerImageA from "../../assets/letter-grades/grade-a.svg";
import markerImageB from "../../assets/letter-grades/grade-b.svg";
import markerImageC from "../../assets/letter-grades/grade-c.svg";
import markerImagePending from "../../assets/letter-grades/grade-pending.svg";
import markerImageTBD from "../../assets/letter-grades/grade-tbd.svg";
import markerImageClosed from "../../assets/letter-grades/grade-closed.svg";
import { Link } from "react-router-dom";
import { alertCheck } from "../utils/helpers";

const StoreCard = ({ store }) => {
  const gradeImages = {
    A: markerImageA,
    B: markerImageB,
    C: markerImageC,
    Z: markerImagePending,
    N: markerImageTBD,
    CLOSED: markerImageClosed,
  };

  const alerts = alertCheck(store);

  return (
    <>
      <article className="card">
        <div className="card__details">
          <Link
            className="card__link"
            to={`/store/${store.violations[0].camis}`}
          >
            <h2 className="card__store-name">{store.name}</h2>
            <p className="card__store-address">
              {`${store.violations[0].building} ${store.violations[0].street}, ${store.violations[0].boro}, NY ${store.violations[0].zipcode}`}
            </p>
            <p className="card__store-alerts">
              {alerts === " " ? "" : `Alerts: ${alerts}`}
            </p>
          </Link>
        </div>
        <div className="card__grade">
          <img
            src={gradeImages[store.grade]}
            alt={`the letter grade ${store.grade} for ${store.name}`}
            className="card__grade-img"
          />
        </div>
      </article>
    </>
  );
};

export default StoreCard;
