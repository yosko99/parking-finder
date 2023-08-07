const getDurationInWords = (duration: number): string => {
  duration = Math.abs(duration);

  const milliseconds = duration % 1000;
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  let result = '';

  if (days > 0) {
    result += `${days} day${days > 1 ? 's' : ''} `;
  }
  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''} `;
  }
  if (minutes > 0) {
    result += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  }
  if (seconds > 0) {
    result += `${seconds} second${seconds > 1 ? 's' : ''} `;
  }
  if (milliseconds > 0) {
    result += `${milliseconds} millisecond${milliseconds > 1 ? 's' : ''} `;
  }

  if (result === '') {
    return '0';
  } else {
    return result.trim();
  }
};

export default getDurationInWords;
