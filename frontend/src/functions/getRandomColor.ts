const getRandomColor = () => {
  const getRandomHex = () => {
    const hexValue = Math.floor(Math.random() * 128).toString(16);
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  };

  const red = getRandomHex();
  const green = getRandomHex();
  const blue = getRandomHex();

  return `#${red}${green}${blue}`;
};

export default getRandomColor;
