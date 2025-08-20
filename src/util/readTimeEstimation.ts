const CHAR_PER_MIN = 238;

const readingMinsEstimation = (text: string) => {
  const contentLength = text.split(" ").length;
  return Math.floor(contentLength / CHAR_PER_MIN);
};

export default readingMinsEstimation;
