// @flow
import humps from 'humps';
import { round, toHexString } from '../utils';

const keys = [
  'fontFace',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'fontStretch',
  'lineHeight',
  'textAlign',
  'letterSpacing',
  'color'
];

type TextStyle = {
  name: string
};

const getValue = (context, textStyle: TextStyle, key) => {
  const value = textStyle[key];
  if (key === 'color') {
    const color = context.project.findColorEqual(value);
    if (color && color.name) {
      return `\${({ theme }) => theme.palette.${humps.camelize(
        color.name.replace('/', '-').toLowerCase()
      )}}`;
    }
    return toHexString(value);
  }

  if (['lineHeight'].indexOf(key) !== -1) {
    return `${round(value / textStyle.fontSize, 2)}`;
  }

  if (['fontSize', 'letterSpacing'].indexOf(key) !== -1) {
    return `${round(value, 2)}px`;
  }
  return value;
};

const convertTextStyleForKey = (context, textStyle: TextStyle, key) => {
  if (
    Object.prototype.hasOwnProperty.call(textStyle, key) &&
    textStyle[key] !== null
  ) {
    const property = humps.decamelize(key, { separator: '-' });
    const value = getValue(context, textStyle, key);
    if (
      (key === 'fontStretch' && textStyle.fontStretch === 'normal') ||
      (key === 'fontStyle' && textStyle.fontStyle === 'normal')
    ) {
      return '';
    }
    if (key === 'fontFace') {
      return `\n    font-family: ${humps.pascalize(value)};`;
    }
    return `\n    ${property}: ${value};`;
  }
  return '';
};

const convertTextStyle = (context, textStyle: TextStyle) => {
  const name = humps.camelize(textStyle.name.replace('/', '-').toLowerCase());
  const pre = `  ${name}: css\``;
  const cssCode = keys
    .map(key => convertTextStyleForKey(context, textStyle, key))
    .join('');
  const post = `\`,\n\n`;
  return pre + cssCode + post;
};

export const generateTextStyles = (context, textStyles: TextStyle[]) => {
  const pre = `
// theme.textStyles

import { css } from 'styled-components';

export default {\n`;
  const post = `}\n`;
  const styles = textStyles
    .map(textStyle => convertTextStyle(context, textStyle))
    .join('');
  const code = pre + styles + post;
  return {
    code,
    mode: 'javascript'
  };
};
export default null;
