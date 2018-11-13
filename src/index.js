/* eslint-disable */
import { generateTextStyles } from './textStyles';

String.prototype.replaceAll = function(search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

export function styleguideTextStyles(context, textStyles) {
  return generateTextStyles(context, textStyles);
}

export function layer() {
  const object = {
    layerName: 'test',
    projectName: 'test2'
  };

  const JSONString = JSON.stringify(object, null, 2);

  return {
    code: JSONString,
    language: 'json'
  };
}
