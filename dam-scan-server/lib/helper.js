/**
 * Search dictionary to find specific value in a value array
 * Example usage: Get building department by building name
 *      getKeyByValue(deptDictionary,"Johnson Hall");
 *     --> Returns: "Engineering"
 * @param {*} object dictionary
 * @param {*} value
 * @returns key of object containing the value
 */
const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key].includes(value));
};

/**
 *
 * @param {*} list
 * @param {*} variableName
 * @returns
 */
const flattenList = (list, variableName) => {
  var results = [];
  list.forEach((item) => {
    results.push(item[variableName]);
  });
  return results;
};

module.exports = {
  flattenList,
  getKeyByValue,
};
