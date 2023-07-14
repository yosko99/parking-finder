const getFormattedISODate = (ISOdate: string): string => {
  const splitted = ISOdate.split('T');

  return `${splitted[0]} at ${splitted[1]}`;
};

export default getFormattedISODate;
