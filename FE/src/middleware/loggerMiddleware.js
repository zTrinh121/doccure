//https://github.com/pmndrs/zustand/discussions/2233

export const loggerMiddleware = (config) => (set, get, api) => {
  const patchedSet = (...args) => {
    console.log('  applying', args);
    set(...args);
    console.log('  new state', get());
  };
  api.setState = patchedSet;
  return config(patchedSet, get, api);
};
