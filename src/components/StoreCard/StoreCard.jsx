import "./StoreCard.scss";
import grade from "../../assets/letter-grades/grade-a.svg";

const StoreCard = () => {
  return (
    <>
      <article className="card">
        <div className="card__details">
          <h2 className="card__store-name">PETE'S CANDY STORE</h2>
          <p>670 Lorimer St. Brooklyn, NY 11211</p>
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
