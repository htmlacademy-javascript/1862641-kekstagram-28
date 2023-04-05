import {createPhotos, appendsPhoto} from './thumbnails.js';
import {errorMessage} from './data-error.js';
const getData = (body) => fetch (

  'https://28.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
    body,
  })

  .then((response) => response.json())
  .then((data) => {
    const photosView = createPhotos(data);
    appendsPhoto(photosView);
  })
  .catch(() => {
    errorMessage('Ошибка!Повторите еще раз!');
  });

export {getData};
