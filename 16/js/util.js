//Генератор случайного числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

function debounce(callback, delay) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}

export {getRandomInteger, isEscapeKey, shuffle, debounce};