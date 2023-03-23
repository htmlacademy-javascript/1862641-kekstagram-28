import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const pictureLinks = document.querySelectorAll('.picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};
// показать модальное окно

const showModal = () => {
  for (const pictureLink of pictureLinks) {
    pictureLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPicture.classList.remove('hidden');

      document.addEventListener('keydown', onDocumentKeydown);
    });
  }
};
showModal();

//закрывае модальное окно
const closeModal = () => {
  bigPictureClose.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

closeModal();

//закрываем модальное окно с клавиатуры


const closeModalEsc = () => {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};
closeModalEsc();
