import humps from 'humps';
import { INDENTATION } from '../config';

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

const toREMValue = (fontSize, options) => {
  const baseUnit = parseInt(options.baseFontSize, 10);
  const unit = options.fontSizeUnit;
  switch (unit) {
    case 'rem': {
      return `${fontSize / baseUnit}${options.fontSizeUnit}`;
    }
    default: {
      return `${fontSize}${options.fontSizeUnit}`;
    }
  }
};

const toRgbaString = color => {
  const rgb = `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
    color.b
  )}`;

  const rgbStr = color.a < 1 ? `rgba(${rgb}, ${color.a})` : `rgb(${rgb})`;

  return rgbStr;
};

const getLineHeight = (value, fontSize, options) => {
  const isUnitLess = options.unitlessLineHeight;
  if (!isUnitLess) {
    return `${round(value / 2, 2)}px`;
  }

  return `${round(value / fontSize, 2)}`;
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

const getDestructure = (nameSpace, name) => {
  if (!nameSpace) return `\${props => props.${name}}`;
  const names = nameSpace.split('.');
  const mainNameSpace = names.length && names[0];
  return `\${({ ${mainNameSpace} }) => ${nameSpace}.${name}}`;
};

export const getThemeTextStyle = (options, context, textStyle) => {
  const foundEqual = context.project.findTextStyleEqual(textStyle);
  if (foundEqual) {
    return getDestructure(
      options.textStyleThemeNameSpace,
      humps.camelize(foundEqual.name.replace(/\//g, '-').toLowerCase())
    );
  }
  return '';
};

export const getThemeColor = (options, context, color) => {
  const foundColor = context.project.findColorEqual(color);
  if (foundColor && foundColor.name) {
    return getDestructure(
      options.colorThemeNameSpace,
      humps.camelize(foundColor.name.replace(/\//g, '-').toLowerCase())
    );
  }
  return getColorStringByFormat(color, options.colorFormat);
};

export const generateBorder = (options, context, border, layerType) => {
  if (
    layerType === 'text' ||
    (border.fill && border.fill.type === 'gradient')
  ) {
    return {};
  }

  const borderColor = toRgbaString(border.fill.color);
  const borderWidth = round(
    border.thickness / context.project.densityDivisor,
    1
  );
  const borderStyle = border.style || 'solid';
  return { border: `${borderWidth}px ${borderStyle} ${borderColor}` };
};

export const generateBoxShadow = (options, context, shadow) => {
  const offsetX = `${round(
    shadow.offsetX / context.project.densityDivisor,
    2
  )}`;
  const offsetY = `${round(
    shadow.offsetY / context.project.densityDivisor,
    2
  )}px`;
  const radius = `${round(
    shadow.blurRadius / context.project.densityDivisor,
    2
  )}px`;
  const spread = `${round(
    shadow.spread / context.project.densityDivisor,
    2
  )}px`;
  const { color } = shadow;
  const string = `${offsetX} ${offsetY} ${radius} ${spread} ${getThemeColor(
    options,
    context,
    color
  )}`;
  return { boxShadow: string };
};

export const blendColors = colors =>
  colors.reduce((blendedColor, color) => blendedColor.blend(color));

export const getCssValue = (options, context, textStyle, key) => {
  const value = textStyle[key];
  switch (key) {
    case 'color': {
      return getThemeColor(options, context, value);
    }
    case 'weightText':
    case 'fontWeight':
      return mapFontWeightValueToNumber(value);
    case 'lineHeight':
      return getLineHeight(value, textStyle.fontSize, options);
    case 'fontSize':
      return toREMValue(value, options);
    case 'letterSpacing':
    case 'width':
    case 'height':
    case 'borderRadius':
      return `${round(value, 2)}px`;
    case 'fontFamily':
      return humps.pascalize(value);
    default:
      return value;
  }
};

export const convertToCss = (
  options,
  context,
  style,
  key,
  excludeProperties = [],
  indentation = `${INDENTATION}`
) => {
  if (!excludeProperties.includes(key !== 'weightText' ? key : 'fontWeight')) {
    const property = humps.decamelize(
      key !== 'weightText' ? key : 'fontWeight',
      { separator: '-' }
    );
    const value = getCssValue(options, context, style, key);
    if (
      !options.showDefaultValues &&
      (value === 'normal' || value === 'regular' || value === '0px')
    ) {
      return '';
    }
    return `\n${indentation}${property}: ${value};`;
  }
  return '';
};
