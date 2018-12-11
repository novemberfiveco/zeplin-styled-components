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
        curr.name.replace(/\//g, '-').toLowerCase()
      )]: `'${getColorStringByFormat(curr, options.colorFormat)}'`
    }),
    {}
  );
  const objectToString = JSON.stringify(sortKeys(colorObject), null, 2).replace(
    /"/g,
    ''
  );
  const code = `
// colors

export default ${objectToString}`;
  return {
    code,
    language: 'javascript'
  };
};
export default null;
