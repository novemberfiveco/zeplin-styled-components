// @flow
import humps from 'humps';
import {
  round,
  getColorStringByFormat,
  mapFontWeightValueToNumber
} from '../utils';

let excludeProperties = ['name'];

type TextStyle = {
  name: string
};

const getValue = (options, context, textStyle: TextStyle, key) => {
  const value = textStyle[key];
  switch (key) {
    case 'color': {
      const color = context.project.findColorEqual(value);
      if (color && color.name) {
        return `\${props => props.${options.colorThemeNameSpace &&
          `${options.colorThemeNameSpace}.`}${humps.camelize(
          color.name.replace(/\//g, '-').toLowerCase()
        )}}`;
      }
      return getColorStringByFormat(value, options.colorFormat);
    }
    case 'weightText':
    case 'fontWeight':
      return mapFontWeightValueToNumber(value);
    case 'lineHeight':
      return `${round(value / textStyle.fontSize, 2)}`;
    case 'fontSize':
    case 'letterSpacing':
      return `${round(value, 2)}px`;
    case 'fontFamily':
      return humps.pascalize(value);
    default:
      return value;
  }
};

const convertTextStyleForKey = (
  options,
  context,
  textStyle: TextStyle,
  key
) => {
  if (!excludeProperties.includes(key)) {
    const property = humps.decamelize(key, { separator: '-' });
    const value = getValue(options, context, textStyle, key);
    if (
      !options.showDefaultValues &&
      (value === 'normal' || value === 'regular' || value === '0px')
    ) {
      return '';
    }
    return `\n    ${property}: ${value};`;
  }
  return '';
};

const convertTextStyle = (options, context, textStyle: TextStyle) => {
  const name = humps.camelize(textStyle.name.replace(/\//g, '-').toLowerCase());
  const pre = `  ${name}: css\``;
  const cssCode = Object.keys(textStyle)
    .map(key => convertTextStyleForKey(options, context, textStyle, key))
    .join('');
  const post = `\n \`,\n\n`;
  return pre + cssCode + post;
};

export const generateTextStyles = (
  options,
  context,
  textStyles: TextStyle[]
) => {
  if (options.excludeProperties) {
    excludeProperties = excludeProperties.concat(
      options.excludeProperties
        .split(',')
        .map(prop => humps.camelize(prop.replace(/\//g, '-').toLowerCase()))
    );
  }
  const pre = `
// theme.textStyles
${excludeProperties.toString()}
import { css } from 'styled-components';

export default {\n`;
  const post = `};\n`;
  const styles = textStyles
    .map(textStyle => convertTextStyle(options, context, textStyle))
    .join('');
  const code = pre + styles + post;
  return {
    code,
    mode: 'javascript'
  };
};
export default null;
