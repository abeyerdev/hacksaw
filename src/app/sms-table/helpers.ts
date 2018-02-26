/**
 * Returns a boolean representing whether n
 * can parse to a Number properly.
 * @param {*} n
 */
export const isNumeric = (n) => {
    return n instanceof Date || (!isNaN(parseFloat(n)) && isFinite(n));
};
