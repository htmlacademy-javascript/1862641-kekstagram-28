import {errorMessage} from './data-error.js';
const getData = (body) => fetch (

  'https://28.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
    body,
  })

  .then((response) => response.json())
  .catch(() => {
    errorMessage('Ошибка!Повторите еще раз!');
  });
export {getData};
