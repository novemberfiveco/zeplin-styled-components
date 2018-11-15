// @flow
import humps from 'humps';
import { toHexString, sortKeys } from '../utils';

type Color = {
  r: number,
  g: number,
  b: number,
  a: number,
  name: string
};
type Colors = Color[];

export const generateColors = (context, colors: Colors) => {
  const colorObject = colors.reduce(
    (acc, curr) => ({
      ...acc,
      [humps.camelize(
        curr.name.replace('/', '-').toLowerCase()
      )]: `'${toHexString(curr)}'`
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
