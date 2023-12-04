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
      temp += inputString[i];
    } else if (inputString[i] === ">") {
      inTag = false;
      temp += inputString[i];
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
  const array = string.replace(" ", "").split(",");
  const res = array.map((i) => {
    return i.replace(/^\S*\s/, "");
  });
  return res;
};

export function arrayLengthStabilizate(q, arr) {
  const columnsQ = q;
  let array = [];
  if (arr.length === columnsQ) {
    array.push(arr);
  } else {
    for (let i = 1; i <= arr.length / columnsQ; i++) {
      const tmp = [];
      arr.forEach((item, ind) => {
        if (ind < columnsQ * i && ind >= columnsQ * (i - 1)) {
          tmp.push(item);
        }
      });
      array.push(tmp);
    }
  }
  return array;
}

export const queryStart = `SELECT column_name
FROM USER_TAB_COLUMNS
WHERE table_name = '`;

export const queryEnd = `'
order by column_id;`;
