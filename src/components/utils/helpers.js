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
    markerWidth: "1rem",
    violations: outputObj[key],
  }));
  getLatestGrade(outputArr);
  findNameWidth(outputArr);
  console.log(outputArr);
  return outputArr;
};

// Add the grade to top level of store object. Accounts for stores that do not have a grade prop in most recent inspection or have been shut down by health dept.
const getLatestGrade = (storesArr) => {
  storesArr.forEach((store) => {
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
    if (!store.grade) {
    }
  });
};

export const getStoreById = (storesArr, id) => {
  if (storesArr.length === 0) return;
  const [matchedStore] = storesArr.filter(
    (store) => store.violations[0].camis == id
  );
  if (!matchedStore) return;
  console.log("matched", matchedStore);
  const dateSortedObj = [];
  matchedStore.violations.forEach((violation) => {
    dateSortedObj[violation.inspection_date]
      ? dateSortedObj[violation.inspection_date].push(violation)
      : (dateSortedObj[violation.inspection_date] = [violation]);
  });
  matchedStore.violationsByDate = dateSortedObj;
  return matchedStore;
};

// calculate longest word in store name, used for dynamic map marker width.
const findNameWidth = (storesArr) => {
  storesArr.forEach((store) => {
    if (store.name) {
      let maxWidth = 0;
      store.name.split(" ").forEach((word) => {
        const width = getWordWidth(word, "8px Arial");
        if (width > maxWidth) maxWidth = width;
      });
      store.markerWidth = maxWidth;
    }
  });
};

const getWordWidth = (text, font) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  return context.measureText(text).width;
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
  let mouseFlag = false;
  let ratFlag = false;
  let roachFlag = false;
  storeObj.violations
    .filter((violation) => violation.inspection_date === latestInspection)
    .forEach((violation) => {
      if (violation.violation_code === "04K") ratFlag = true;
      if (violation.violation_code === "04L") mouseFlag = true;
      if (violation.violation_code === "04M") roachFlag = true;
    });
  return `${mouseFlag ? "🐁" : ""}${ratFlag ? "🐀" : ""}${
    roachFlag ? "🪳" : ""
  }`;
};

export const calculateBounds = (centerLat, centerLng, radius) => {
  // Earth's radius in kilometers
  const earthRadius = 6371;

  // Convert radius from meters to kilometers
  const radiusInKm = radius / 1000;

  // Latitude: 1 degree = 111.32 km
  const latChange = radiusInKm / 111.32;
  const north = centerLat + latChange;
  const south = centerLat - latChange;

  // Longitude: 1 degree = 111.32 km * cos(latitude)
  const lngChange =
    radiusInKm / (111.32 * Math.cos(centerLat * (Math.PI / 180)));
  const east = centerLng + lngChange;
  const west = centerLng - lngChange;

  return {
    north,
    south,
    east,
    west,
  };
};

export const ratZone = (storesArr) => {
  let score = 0;
  let countA = 0;
  let countB = 0;
  let countC = 0;
  let countZ = 0;
  let countClosed = 0;
  storesArr.map((store) => {
    if (store.grade === "A") {
      score += 1;
      countA++;
    }
    if (store.grade === "B") {
      score += 100;
      countB++;
    }
    if (store.grade === "Z") {
      score += 500;
      countC++;
    }
    if (store.grade === "C") {
      score += 1000;
      countZ++;
    }
    if (store.grade === "CLOSED") {
      score += 5000;
      countClosed++;
    }
  });
  console.log(
    `ratzone grade letter total score: ${score}\n A grades: ${countA}\n B grades: ${countB}\n C grades: ${countC}\n Grade pending: ${countZ}\n Close by DOH: ${countClosed}`
  );
};
