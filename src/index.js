import { generateTextStyles } from './textStyles';
import { generateColors } from './colorStyles';

export function styleguideTextStyles(context, textStyles) {
  return generateTextStyles(context, textStyles);
}

export function styleguideColors(context, colors) {
  return generateColors(context, colors);
}
