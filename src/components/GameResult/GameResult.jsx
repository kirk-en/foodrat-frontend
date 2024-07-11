import { useEffect, useState } from "react";
import { getStoreById } from "../utils/helpers";
import markerImageA from "../../assets/letter-grades/grade-a.svg";
import markerImageB from "../../assets/letter-grades/grade-b.svg";
import markerImageC from "../../assets/letter-grades/grade-c.svg";
import markerImagePending from "../../assets/letter-grades/grade-pending.svg";
import markerImageTBD from "../../assets/letter-grades/grade-tbd.svg";
import markerImageClosed from "../../assets/letter-grades/grade-closed.svg";
import mouse from "../../assets/emoji/mouse.png";
import cockroach from "../../assets/emoji/cockroach.png";
import rat from "../../assets/emoji/rat.png";
import "./GameResult.scss";
import { Link } from "react-router-dom";

const GameResult = ({ playerScore, radar }) => {
  const gradeImages = {
    A: markerImageA,
    B: markerImageB,
    C: markerImageC,
    Z: markerImagePending,
    N: markerImageTBD,
    CLOSED: markerImageClosed,
  };
  const violationsArr = [];
  // for (const date in selectedStore.violationsByDate) {
  //   violationsArr.push(selectedStore.violationsByDate[date]);
  // }
  console.log("score inside results component", playerScore);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return playerScore ? (
    <article className="store-details">
      <section className="results-flex">
        <div>
          <img src={gradeImages.A} className="card__grade-img" />
          <p>1pt</p>
          <p>X</p>
          <p>{playerScore.countA}</p>
        </div>
        <div>
          <img src={gradeImages.B} className="card__grade-img" />
          <p>100pt</p>
          <p>X</p>
          <p>{playerScore.countB}</p>
        </div>
        <div>
          <img src={gradeImages.Z} className="card__grade-img" />
          <p>500pt</p>
          <p>X</p>
          <p>{playerScore.countZ}</p>
        </div>
        <div>
          <img src={gradeImages.C} className="card__grade-img" />
          <p>1,000pt</p>
          <p>X</p>
          <p>{playerScore.countC}</p>
        </div>
        <div>
          <img src={gradeImages.CLOSED} className="card__grade-img" />
          <p>5,000pt</p>
          <p>X</p>
          <p>{playerScore.countClosed}</p>
        </div>
      </section>
      <section className="results-flex">
        <div>
          <img src={mouse} className="card__grade-img" />
          <p>50pt</p>
          <p>X</p>
          <p>{playerScore.mouseCount}</p>
        </div>
        <div>
          <img src={cockroach} className="card__grade-img" />
          <p>75pt</p>
          <p>X</p>
          <p>{playerScore.roachCount}</p>
        </div>
        <div>
          <img src={rat} className="card__grade-img" />
          <p>250pt</p>
          <p>X</p>
          <p>{playerScore.ratCount}</p>
        </div>
      </section>
      <section className="results-flex">
        <div>
          <p>
            Mouse + Rat in same Restaurant?:{" "}
            {playerScore.mouseRatBonus ? ".5x Bonus!" : "No Bonus This Time 😞"}
          </p>
          <p>
            Restaurant with Above 75 Violation Points?:{" "}
            {playerScore.above75bonus ? ".5x Bonus!" : "No Bonus This Time 😞"}
          </p>
          <p>
            Restaurant with Above 100 Violation Points?:{" "}
            {playerScore.above100bonus
              ? ".75x Bonus!"
              : "No Bonus This Time 😞"}
          </p>
          <p>
            Restaurant with Above 125 Violation Points? 🤮:{" "}
            {playerScore.above125bonus
              ? "1.25x Bonus!"
              : "No Bonus This Time 😞"}
          </p>
          <p>Total Multiplier = {playerScore.multiplier} X</p>
          <p>UAV Used? ✈: {radar ? "-5%" : "No Penalty"}</p>
        </div>
      </section>
      <section>
        <h1
          className={`end-score ${isClicked ? "end-score--clicked" : ""}`}
          onClick={handleClick}
        >
          Your Total Score: {playerScore.score}
        </h1>
      </section>

      <div className="store-details__bottom">
        <Link to={"/ratzone"} className="store-details__btn">
          <span>Close</span>
        </Link>
      </div>
    </article>
  ) : (
    <p>no score yet</p>
  );
};

export default GameResult;
