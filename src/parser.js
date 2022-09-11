import yaml from 'js-yaml';

// const parser = (data, format) => {
//   switch (format) {
//     case 'json':
//       return JSON.parse(data);
//     case 'yaml':
//       return yaml.load(data);
//     case 'yml':
//       return yaml.load(data);
//     default:
//       throw new Error(`'${format}' is unknown file format. Please use json, yaml or yml files!`);
//   }
// };
const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (data, format) => parsers[format](data);

export default parse;
