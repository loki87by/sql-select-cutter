export function stringUpdater(str) {
  return str.replace(/('[^']*')|("[^"]*")|(\([^)]*\))|(\{[^}]*\})|\s/g, (match, p1, p2, p3, p4) => {
    if (p1 || p2 || p3 || p4) {
      return match;
    } else {
      return '\n';
    }
  });
}

export function stringSplitter(str) {
  const separator = ','
  let insideQuotes = false;
  let insideBrackets = 0;
  let insideCurlyBraces = 0;
  let result = [];
  let currentPiece = '';

  for (let i = 0; i < str.length; i++) {

    if (str[i] === "'" || str[i] === '"') {
      insideQuotes = !insideQuotes;
    } else if (str[i] === '[' && !insideQuotes) {
      insideBrackets++;
    } else if (str[i] === ']' && !insideQuotes) {
      insideBrackets--;
    } else if (str[i] === '{' && !insideQuotes) {
      insideCurlyBraces++;
    } else if (str[i] === '}' && !insideQuotes) {
      insideCurlyBraces--;
    }

    if (str[i] === separator && !insideQuotes && insideBrackets === 0 && insideCurlyBraces === 0) {
      result.push(currentPiece);
      currentPiece = '';
    } else {
      currentPiece += str[i];
    }
  }

  result.push(currentPiece);
  return result;
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
