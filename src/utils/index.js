export const round = (number, decimalPlaces = 2) =>
  parseFloat(number.toFixed(decimalPlaces));

export const sortKeys = data => {
  const ordered = {};
  Object.keys(data)
    .sort()
    .forEach(key => {
      ordered[key] = data[key];
    });
  return ordered;
};

const toHSLAString = color => {
  const hslColor = color.toHSL();
  const hsl =
    `${Math.round(hslColor.h * 360)}, ` +
    `${Math.round(hslColor.s * 100)}%, ` +
    `${Math.round(hslColor.l * 100)}%`;

  const hslStr = color.a < 1 ? `hsla(${hsl}, ${color.a})` : `hsl(${hsl})`;

  return hslStr;
};

const toRgbaString = color => {
  const rgb = `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
    color.b
  )}`;

  const rgbStr = color.a < 1 ? `rgba(${rgb}, ${color.a})` : `rgb(${rgb})`;

  return rgbStr;
};

export const mapFontWeightValueToNumber = fontweight => {
  const values = {
    light: 300,
    regular: 400,
    semibold: 600,
    bold: 700
  };
  return values[fontweight] || fontweight;
};

const toHexString = color => {
  let colorString = `#${color.hexBase()}`;

  if (color.a < 1) {
    colorString = `${toRgbaString(color)}`;
  }

  return colorString;
};

export const getColorStringByFormat = (color, colorFormat) => {
  switch (colorFormat) {
    case 'hex':
      return toHexString(color);
    case 'hsl':
      return toHSLAString(color);
    case 'rgb':
      return toRgbaString(color);

    case 'default':
    default:
      return toHexString(color);
  }
};
