import {
  queryStart,
  queryBodyPreStart,
  queryBodyStart,
  queryBodyEnd,
  queryEnd,
} from "./consts.js";

export const aliasesQuery = (arr) => {
  let str = "";
  if (arr.length === 1) {
    str = `${queryStart} = '${arr[0].table}' order by column_id;`;
  } else {
    str = `${queryStart}IN (\n`;
    str += Object.values(arr.map((i) => `'${i.table}'`)).join(",\n");
    str += queryBodyPreStart;
    Object.values(arr.map((i) => i.table)).forEach((table, index) => {
      str += `${queryBodyStart}'${table}'${queryBodyEnd}${index + 1}\n`;
    });
    str += `ELSE ${arr.length + 1}${queryEnd}`;
  }
  const uniqueSubStrings = Array.from(new Set(str.split("\n")));
  return uniqueSubStrings.join("\n");
};

export function stringUpdater(str) {
  const inputString = str
    .replace(/( +)|(\n+)/g, (match, p1, p2) => {
      if (p1) {
        return " ";
      } else if (p2) {
        return ", ";
      } else {
        return match;
      }
    })
    .replace(/null null/g, `null, null`)
    .replace(/null\nnull/g, `null, null`);
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

export function debounce(f, t) {
  let lastCall = Date.now();
  let lastCallTimer = setTimeout(() => f(), t);

  return function () {
    const previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= t) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => f(), t);
  };
}

export const insertsChecker = (arr) => {
  if (arr.some((i) => i.toUpperCase().includes("INSERT INTO"))) {
    alert('Смените режим копирования с "SQL Inserts" на "CSV"');
  } else {
    return arr;
  }
};

export const floatToDate = (float) => {
  const milliseconds = (float - 25569) * 86400000;
  const dateObject = new Date(milliseconds);
  return dateObject;
};

const maybeFloat = (num) => {
  return (
    typeof Date.parse(floatToDate(num)) === "number" &&
    !isNaN(Date.parse(floatToDate(num)))
  );
};

const findMaybeFloat = (first, last) => {
  const fmf = maybeFloat(+first);
  const lmf = maybeFloat(+last);
  if (fmf && lmf) return null;
  if (!fmf) return last;
  if (!lmf) return first;
};

const findNumberImpossible = (first, last) => {
  const lni = isNaN(+first);
  const fni = isNaN(+last);
  if (!fni) return last;
  if (!lni) return first;
};

export const findNReplaceLastElement = (cur, zero) => {
  const isFirstString = isNaN(+zero);
  let isFirstMaybeFloat;
  let current;
  const first = cur[0];
  const last = cur[cur.length - 1];
  //const firstLength = zero.length;

  if (!isFirstString) {
    isFirstMaybeFloat = maybeFloat(+zero);

    if (isFirstMaybeFloat && findMaybeFloat(first, last) !== null) {
      current = findMaybeFloat(first, last);
      return current;
    } else {
      current = findNumberImpossible(first, last);
      return current;
    }
  } else {
    const match = cur.join(" ").match(/\s\p{Lu}/u);
    const upperIndex = match ? match.index : -1;
    if (match) {
      return cur.join(" ").slice(upperIndex).trim();
    } else {
      if (findMaybeFloat(...cur)) {
        return findMaybeFloat(...cur);
      } else if (findNumberImpossible(...cur)) {
        return findNumberImpossible(...cur);
      } else {
        return null;
      }
    }
  }
};
