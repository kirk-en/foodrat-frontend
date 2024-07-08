import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { getStoreById } from "../utils/helpers";
import markerImageA from "../../assets/letter-grades/grade-a.svg";
import markerImageB from "../../assets/letter-grades/grade-b.svg";
import markerImageC from "../../assets/letter-grades/grade-c.svg";
import markerImagePending from "../../assets/letter-grades/grade-pending.svg";
import markerImageTBD from "../../assets/letter-grades/grade-tbd.svg";
import markerImageClosed from "../../assets/letter-grades/grade-closed.svg";
import "./StoreDetails.scss";
import { Link } from "react-router-dom";

const StoreDetails = ({ selectedStore }) => {
  const gradeImages = {
    A: markerImageA,
    B: markerImageB,
    C: markerImageC,
    Z: markerImagePending,
    N: markerImageTBD,
    CLOSED: markerImageClosed,
  };
  const violationsArr = [];
  for (const date in selectedStore.violationsByDate) {
    violationsArr.push(selectedStore.violationsByDate[date]);
  }

  return (
    <article className="store-details">
      <div className="store-details__header">
        <h1 className="store-details__store-name">{selectedStore?.name}</h1>
        <img
          src={gradeImages[selectedStore.grade]}
          alt={`the letter grade ${selectedStore.grade} for ${selectedStore.name}`}
          className="store-details__grade-img"
        />
      </div>
      <div className="store-details__violations">
        {violationsArr.map((date, index) => (
          <div key={index}>
            <h2 className="store-details__violations-date">
              {date[0].inspection_date.split("T")[0]}
            </h2>
            <ul className="store-details__violations-list">
              {date.map((violation) => (
                <li
                  key={`${violation.inspection_date}-${violation.violation_code}`}
                  className="store-details__violations-list-item"
                >
                  {violation?.violation_description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="store-details__bottom">
        <Link to={"/"}>
          <button>Close</button>
        </Link>
      </div>
    </article>
  );
};

export default StoreDetails;
