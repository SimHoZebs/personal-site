const CHAR_PER_MIN = 238;
const readingMinsEstimation = (contentLength: number) => {
  return Math.floor(contentLength / CHAR_PER_MIN);
};

export default readingMinsEstimation;
