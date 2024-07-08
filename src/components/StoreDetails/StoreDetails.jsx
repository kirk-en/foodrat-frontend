import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { getStoreById } from "../utils/helpers";
import "./StoreDetails.scss";

const StoreDetails = ({ selectedStore }) => {
  const violationsArr = [];
  for (const date in selectedStore.violationsByDate) {
    violationsArr.push(selectedStore.violationsByDate[date]);
  }

  return (
    <article className="store-details">
      <h1 className="store-details__store-name">{selectedStore?.name}</h1>
      {violationsArr.map((date, index) => (
        <div key={index}>
          <h2>{date[0].inspection_date.split("T")[0]}</h2>
          {date.map((violation) => (
            <p>{violation?.violation_description}</p>
          ))}
        </div>
      ))}
    </article>
  );
};

export default StoreDetails;
