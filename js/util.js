const isEscapeKey = (evt) => evt.key === 'Escape';

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, shuffle, debounce};
