const setMapValue = (key: string, map: Map<any, any>) => {
  if (!map.has(key) && key !== null) {
    map.set(key, 1);
  } else if (map.has(key) && key !== null) {
    map.set(key, map.get(key) + 1);
  }
};

export default setMapValue;
