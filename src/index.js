import { generateTextStyles } from './textStyles';
import { generateColors } from './colorStyles';
import { generateLayerStyle } from './layer';
import { OPTION_NAMES } from './config';

export function styleguideTextStyles(context, textStyles) {
  const options = {
    colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT),
    showDefaultValues: context.getOption(OPTION_NAMES.SHOW_DEFAULT_VALUES),
    excludeProperties: context.getOption(OPTION_NAMES.EXCLUDE_PROPERTIES),
    colorThemeNameSpace: context.getOption(OPTION_NAMES.COLOR_THEME_NAMESPACE),
    fontSizeUnit: context.getOption(OPTION_NAMES.FONT_SIZE_UNIT),
    baseFontSize: context.getOption(OPTION_NAMES.BASE_FONT_SIZE),
    unitlessLineHeight: context.getOption(OPTION_NAMES.UNITLESS_LINEHEIGHT)
  };
  return generateTextStyles(options, context, textStyles);
}

export function styleguideColors(context, colors) {
  const options = {
    colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT)
  };
  return generateColors(options, context, colors);
}

export function exportStyleguideColors(context, colors) {
  const { code: colorCode, language } = styleguideColors(context, colors);
  const code = `${colorCode}`;

  return {
    code,
    filename: 'palette.js',
    language
  };
}

export function layer(context, selectedLayer) {
  const options = {
    colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT),
    showDefaultValues: context.getOption(OPTION_NAMES.SHOW_DEFAULT_VALUES),
    excludeProperties: context.getOption(OPTION_NAMES.EXCLUDE_PROPERTIES),
    colorThemeNameSpace: context.getOption(OPTION_NAMES.COLOR_THEME_NAMESPACE),
    fontSizeUnit: context.getOption(OPTION_NAMES.FONT_SIZE_UNIT),
    baseFontSize: context.getOption(OPTION_NAMES.BASE_FONT_SIZE),
    textStyleThemeNameSpace: context.getOption(
      OPTION_NAMES.TEXTSTYLE_THEME_NAMESPACE
    ),
    unitlessLineHeight: context.getOption(OPTION_NAMES.UNITLESS_LINEHEIGHT)
  };
  return generateLayerStyle(options, context, selectedLayer);
}

export function exportStyleguideTextStyles(context, textStyles) {
  const { code: textStyleCode, language } = styleguideTextStyles(
    context,
    textStyles
  );
  const code = `${textStyleCode}`;

  return {
    code,
    filename: 'textStyles.js',
    language
  };
}
