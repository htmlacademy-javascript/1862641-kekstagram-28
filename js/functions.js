//функция 1
const text = 'Hello world';
function stringLength () {
  const sybmbols = 10;
  if(text.length >= sybmbols) {
    return true;
  } else {
    return false;
  }
}
stringLength('');

//функция 2
function checkPalindrome (str) {
  str = str.toString().toLowerCase().replace(/\s|[,.!?"-/]/g,'');
  return str === str.split('').reverse().join('');
}
checkPalindrome('Анна');

//функция 3
function checkNumber (str) {
  let numberResult = '';
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str.at(i), 10))) {
      numberResult += str.at(i);
    }
  }
  return parseInt(numberResult, 10);
}
checkNumber(2023);
//функция 4
function checkString (str, minLength, pad) {
  const actual = minLength - str.length;
  if (actual <= 0) {
    return str;
  }
  return pad.slice(0, pad % pad.length) + pad.repeat(actual / pad.length) + str;
}
checkString('qwerty', 4, '0');
