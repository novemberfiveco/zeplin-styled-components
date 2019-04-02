import humps from 'humps';
import {
  blendColors,
  getThemeColor,
  getThemeTextStyle,
  convertToCss,
  generateBoxShadow,
  generateBorder
} from '../utils';
import { INDENTATION } from '../config';

let excludeProperties = ['name'];

const getTextStyles = (options, context, textStyles) => {
  let style = '';
  textStyles.forEach(textStyle => {
    const themeTextStyle =
      textStyle && getThemeTextStyle(options, context, textStyle);
    if (themeTextStyle) {
      style += `\n${INDENTATION}${themeTextStyle};`;
    } else {
      style += Object.keys(textStyle)
        .map(key =>
          convertToCss(options, context, textStyle, key, excludeProperties)
        )
        .join('');
    }
  });
  return style;
};

const getUniqueLayerTextStyles = layer => {
  const uniqueTextStyles = [];

  layer.textStyles.forEach(({ textStyle }) => {
    const found = uniqueTextStyles.some(textStyle.equals, textStyle);

    if (found) {
      return;
    }

    uniqueTextStyles.push(textStyle);
  });

  return uniqueTextStyles;
};

export const generateLayerStyle = (options, context, layer) => {
  if (options.excludeProperties) {
    excludeProperties = excludeProperties.concat(
      options.excludeProperties
        .split(',')
        .map(prop => humps.camelize(prop.replace(/\//g, '-').toLowerCase()))
    );
  }
  const pre = `export const ${humps.pascalize(
    layer.name.replace(/\//g, '-').toLowerCase()
  )} = styled.div\``;

  const post = `\n\`; \n`;

  const style = {};

  style.height = layer.rect.height;
  style.width = layer.rect.width;

  const { fills, borderRadius, opacity, type, shadows, borders } = layer;

  if (fills.length && fills[0].color) {
    const blendedColor = blendColors(layer.fills.map(fill => fill.color));
    style.backgroundColor = getThemeColor(options, context, blendedColor);
  }

  if (borderRadius > 0) {
    style.borderRadius = borderRadius;
  }

  if (opacity < 1) {
    style.opacity = opacity;
  }

  if (shadows.length) {
    Object.assign(
      style,
      generateBoxShadow(options, context, shadows[shadows.length - 1])
    );
  }

  if (borders.length) {
    Object.assign(
      style,
      generateBorder(options, context, borders[borders.length - 1], type)
    );
  }

  const styles = Object.keys(style)
    .map(key => convertToCss(options, context, style, key, excludeProperties))
    .join('');

  let text = '';
  if (type === 'text') {
    text = `${getTextStyles(
      options,
      context,
      getUniqueLayerTextStyles(layer)
    )}`;
  }

  const code = pre + text + styles + post;
  return {
    code,
    language: 'javascript'
  };
};

export default null;
