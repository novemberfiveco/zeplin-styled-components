export const round = (number, decimalPlaces = 2) =>
  parseFloat(number.toFixed(decimalPlaces));

const toRgbaString = color => {
  const rgb = `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
    color.b
  )}`;

  const rgbStr = color.a < 1 ? `rgba(${rgb}, ${color.a})` : `rgb(${rgb})`;

  return rgbStr;
};

export const toHexString = color => {
  let colorString = `#${color.hexBase()}`;

  if (color.a < 1) {
    colorString = `${toRgbaString(color)}`;
  }

  return colorString;
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

export const getColorStringByFormat = (color, colorFormat) => {
  switch (colorFormat) {
    case 'hex':
      return toHexString(color);

    case 'rgb':
      return toRgbaString(color);

    case 'default':
    default:
      return toHexString(color);
  }
};

export default null;
