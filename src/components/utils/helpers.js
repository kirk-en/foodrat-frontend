import { testArr } from "./testArr.js";

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

// Add the grade to top level of store object and account for stores that do not have a grade prop in most recent inspection.
// Not sure why some cited violation are missing the grade property, noted inconsistency in the data set.
const getLatestGrade = (storeArr) => {
  storeArr.forEach((store) => {
    for (let i = 0; i < store.violations.length; i++) {
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

// groupByStore(testArr);
