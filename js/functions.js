//функция 1
function stringLength (text, sybmbols) {
  if(text.length <= sybmbols) {
    return true;
  } else {
    return false;
  }
}
stringLength('проверяемая строка', 20);

//функция 2
function checkPalindrome (str) {
  str = str.toString().toLowerCase().replace(/\s|[,.!?"-/]/g,'');
  return str === str.split('').reverse().join('');
}
checkPalindrome('Анна');

//функция 3
function getNumberFromString (str) {
  let numberResult = '';
  for (let i = 0; i < str.length; i++) {
    if (!getNumberFromString.isNaN(parseInt(str.at(i), 10))) {
      numberResult += str.at(i);
    }
  }
  return parseInt(numberResult, 10);
}
getNumberFromString(2023);
//функция 4
function checkString (str, minLength, pad) {
  const actual = minLength - str.length;
  if (actual <= 0) {
    return str;
  }
  return pad.slice(0, actual % pad.length) + pad.repeat(actual / pad.length) + str;
}
checkString('qwerty', 4, '0');

