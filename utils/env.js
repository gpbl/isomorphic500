// https://github.com/insin/isomorphic-lab/blob/master/src/utils/env.js
export default {
  BROWSER: typeof window !== 'undefined',
  SERVER: typeof window === 'undefined'
};