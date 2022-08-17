import yaml from 'js-yaml';

const parseFile = (fileFormat, data) => {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`'${fileFormat}' is unknown file format. Please use json, yaml or yml files!`);
  }
};

export default parseFile;
