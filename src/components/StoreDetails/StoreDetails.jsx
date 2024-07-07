import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { getStoreById } from "../utils/helpers";
import "./StoreDetails.scss";

const StoreDetails = ({ selectedStore }) => {
  console.log("delivered to store details component:", selectedStore);

  return (
    <article className="store-details">
      <h1 className="store-details__store-name">{selectedStore?.name}</h1>
      {selectedStore.violations.map((violation) => {
        return (
          <p key={`${violation.violation_code}-${violation.inspection_date}`}>
            {violation.violation_description}
          </p>
        );
      })}
    </article>
  );
};

export default StoreDetails;
