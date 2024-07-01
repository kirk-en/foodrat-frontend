import "./StoreCard.scss";
import grade from "../../assets/letter-grades/grade-a.svg";
import { Link } from "react-router-dom";

const StoreCard = () => {
  return (
    <>
      <article className="card">
        <div className="card__details">
          <Link className="card__link" to={'/store/storeID'}>
            <h2 className="card__store-name">TACO BELL</h2>
            <p className="card__store-address">
              670 Lorimer St. Brooklyn, NY 11211
            </p>
            <p className="card__store-alerts">Alerts: 🐀 🪳</p>
          </Link>
        </div>
        <div className="card__grade">
          <img
            src={grade}
            alt="the letter grade 'GRADE_LETTER' for 'RESTAURANT-NAME'"
            className="card__grade-img"
          />
        </div>
      </article>
    </>
  );
};

export default StoreCard;
