export const round = (number, decimalPlaces = 2) =>
  parseFloat(number.toFixed(decimalPlaces));

const toHex = num => (num < 16 ? '0' : '') + num.toString(16);

export const toHexString = (color, prefix) => {
  let hexCode = color.hexBase();

  if (color.a < 1) {
    const hexA = toHex(color.a * 255);

    hexCode = prefix ? hexA + hexCode : hexCode + hexA;
  }

  return `#${hexCode}`;
};

export const sortKeys = data => {
  const ordered = {};
  Object.keys(data)
    .sort()
    .forEach(key => {
      ordered[key] = data[key];
    });
  return ordered;
};

export default null;
