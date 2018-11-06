// @flow
import humps from 'humps';
import { convertToCss } from '../utils';

import { INDENTATION } from '../config';

let excludeProperties = ['name'];

type TextStyle = {
  name: string
};

const convertTextStyle = (options, context, textStyle: TextStyle) => {
  const name = humps.camelize(textStyle.name.replace(/\//g, '-').toLowerCase());
  const pre = `${INDENTATION}${name}: css\``;
  const cssCode = Object.keys(textStyle)
    .map(key =>
      convertToCss(
        options,
        context,
        textStyle,
        key !== 'weightText' ? key : 'fontWeight',
        excludeProperties,
        `${INDENTATION}${INDENTATION}`
      )
    )
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
// textStyles

import { css } from 'styled-components';

export default {\n`;
  const post = `};\n`;
  const styles = textStyles
    .map(textStyle => convertTextStyle(options, context, textStyle))
    .join('');
  const code = pre + styles + post;
  return {
    code,
    language: 'javascript'
  };
};
export default null;
