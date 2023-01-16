export const omit = (obj, key) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};
