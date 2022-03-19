const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (elements) => {
  const features = new Array(getRandomPositiveInteger(1, elements.length));
  for (let i = 0; i < features.length; i++) {features[i] = elements[i];}
  return features;
};

// Склонение существительных после числительного
const numDecline = (n, form1, form2, form3) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return form3;
  }
  if (n1 > 1 && n1 < 5) {
    return form2;
  }
  if (n1 === 1) {
    return form1;
  }
  return form3;
};

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomArray,
  numDecline,
};
