import { NowRequestQuery } from '@now/node'

export default function hpp(query: NowRequestQuery = {}) {
  const output: QueryParms = {};

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      output[key] = value[0];
    } else if (typeof value === 'string') {
      output[key] = value;
    }
  });

  return output;
};
