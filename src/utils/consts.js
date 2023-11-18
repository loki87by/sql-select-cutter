export function stringUpdater(str) {
  return str.replace(/("[^"]*")|\s/g, function (match, group1) {
    return group1 ? group1 : "\n";
  });
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
