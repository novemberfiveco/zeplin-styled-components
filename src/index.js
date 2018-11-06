import { generateColors } from './colorStyles';

const layer = () => ({
  code: 'U moeder',
  mode: 'swift'
});

const styleguideColors = (context, colors) => generateColors(context, colors);

const exportStyleguideColors = (context, colors) => ({
  ...generateColors(context, colors),
  filename: 'styleguide-colors.js'
});

export default {
  layer,
  styleguideColors,
  exportStyleguideColors
};
