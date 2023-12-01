/* eslint-disable no-useless-escape */

export function stringUpdater(str) {
  const inputString = str.replace(/( +)|(\n+)/g, (match, p1, p2) => {
    if (p1) {
      return " ";
    } else if (p2) {
      return ", ";
    } else {
      return match;
    }
  });
  let result = [];
  let temp = "";
  let inTag = false;
  let inQuotes = false;

  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === "<") {
      inTag = true;
    } else if (inputString[i] === ">") {
      inTag = false;
    } else if (inputString[i] === '"' && !inTag) {
      inQuotes = !inQuotes;
    } else if (inputString[i] === "," && !inTag && !inQuotes) {
      result.push(temp);
      temp = "";
    } else {
      temp += inputString[i];
    }
  }
  result.push(temp);
  return result.map((val) => (val.trim() === "" ? null : val.trim()));
}

export function arrayUpdater(array, notNullIndexes) {
  const arrayUpdate = array.map((i, ind) => {
    if (notNullIndexes.includes(ind)) {
      return i;
    } else {
      return null;
    }
  });
  return arrayUpdate.filter((i) => i !== null);
}

export const selectCutter = (data) => {
  const select = data
    .toLowerCase()
    .replace(/select\s*/, "")
    .replace(/\s*from\s[\s\S]*/, "");
  const string = select.replace(/( +)|(\n)/g, (match, p1, p2) => {
    if (p1) {
      return " ";
    } else if (p2) {
      return "\n";
    } else {
      return match;
    }
  });
  const array = string.split(/,\s/g);
  const res = array.map((i) => {
    return i.replace(/^\S*\s/, "");
  });
  return res;
};
