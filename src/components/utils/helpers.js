import { testArr } from "./testArr.js";
import { useEffect, useRef } from "react";

// Data should be received with violations sorted from newest to oldest
export const groupByStore = (arr) => {
  const outputObj = {};
  arr.forEach((entry) => {
    outputObj[entry.dba]
      ? outputObj[entry.dba].push(entry)
      : (outputObj[entry.dba] = [entry]);
  });

  const outputArr = Object.keys(outputObj).map((key) => ({
    name: key,
    coords: {
      latitude: outputObj[key][0]?.latitude,
      longitude: outputObj[key][0]?.longitude,
    },
    violations: outputObj[key],
  }));
  getLatestGrade(outputArr);
  console.log(outputArr);
  return outputArr;
};

// Add the grade to top level of store object. Accounts for stores that do not have a grade prop in most recent inspection or have been shut down by health dept.
const getLatestGrade = (storeArr) => {
  storeArr.forEach((store) => {
    for (let i = 0; i < store.violations.length; i++) {
      if (/Establishment Closed by DOHMH/.test(store.violations[i].action)) {
        store.grade = "CLOSED";
        break;
      }
      if (store.violations[i].inspection_date === "1900-01-01T00:00:00.000") {
        store.grade = "N";
        break;
      }
      if (store.violations[i].grade) {
        store.grade = store.violations[i].grade;
        break;
      }
    }
  });
};

export const getLocation = (setStateFunc, defaultLoc) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("user position:", position);
      setStateFunc(position.coords);
    },
    () => {
      setStateFunc(defaultLoc);
    }
  );
};

// The debouncer will prevent an API request being sent to NYC Open Data
// until the map has stopped moving for 1 second.
export const debouncer = (func, delay, dependencies) => {
  const callback = useRef();

  useEffect(() => {
    callback.current = func;
  }, [func]);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback.current();
    }, delay);

    return () => clearTimeout(handler);
  }, [...dependencies, delay]);
};

// Checks the most recent inspection for violations involving mice, rats, or roaches
export const alertCheck = (storeObj) => {
  const latestInspection = storeObj.violations[0].inspection_date;
  let ratFlag = false;
  let roachFlag = false;
  storeObj.violations
    .filter((violation) => violation.inspection_date === latestInspection)
    .forEach((violation) => {
      if (
        violation.violation_code === "04K" ||
        violation.violation_code === "04L"
      )
        ratFlag = true;
      if (violation.violation_code === "04M") roachFlag = true;
    });
  return `${ratFlag ? "🐀" : ""} ${roachFlag ? "🪳" : ""}`;
};

// groupByStore(testArr);
