// @flow
import humps from 'humps';
import { sortKeys, getColorStringByFormat } from '../utils';

type Color = {
  r: number,
  g: number,
  b: number,
  a: number,
  name: string
};
type Colors = Color[];

export const generateColors = (options, context, colors: Colors) => {
  const colorObject = colors.reduce(
    (acc, curr) => ({
      ...acc,
      [humps.camelize(
        curr.name.replace('/', '-').toLowerCase()
      )]: `'${getColorStringByFormat(curr, options.colorFormat)}'`
    }),
    {}
  );
  const objectToString = JSON.stringify(sortKeys(colorObject), null, 2).replace(
    /"/g,
    ''
  );
  const code = `
// theme.palette

export default ${objectToString}`;
  return {
    code,
    mode: 'javascript'
  };
};
export default null;
