// @flow
import humps from 'humps';

type Color = {
  r: number,
  g: number,
  b: number,
  a: number,
  name: string
};
type Colors = Color[];

const colorFormatter = (color: Color) =>
  `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

export const generateColors = (context, colors: Colors) => {
  const colorObject = colors.reduce(
    (acc, curr) => ({
      ...acc,
      [humps.camelize(
        curr.name.replaceAll('/', '-').toLowerCase()
      )]: colorFormatter(curr)
    }),
    {}
  );
  // const code = prettier.format(`export default ${JSON.stringify(colorObject)}`);
  const code = `
// theme.palette
export default ${JSON.stringify(colorObject, null, 2)}`;
  return {
    code,
    mode: 'javascript'
  };
};
export default null;
