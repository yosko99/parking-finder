const formatDate = (inputDate: string): string => {
  const dateObj = new Date(inputDate);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
};

export default formatDate;
