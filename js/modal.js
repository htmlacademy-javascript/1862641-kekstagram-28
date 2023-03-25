import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

const createCommemtItem = (comment) => {
  const newComment = document.createElement('li');
  const commentAvatar = document.createElement('img');
  const commentText = document.createElement('p');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  commentText.textContent = comment.message;
  commentText.classList.add('social__text');
  newComment.classList.add('social__comment');
  newComment.appendChild(commentAvatar);
  newComment.appendChild(commentText);

  return newComment;
};

const createBigPicture = (photos) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureComments = bigPicture.querySelector('.comments-count');
  const commentsList = bigPicture.querySelector('.social__comments');

  for (let i = 0; i < photos.commemts.length; i++) {
    const itemComment = createCommemtItem(photos.commemts[i]);
    commentsList.appendChild(itemComment);
  }
  bigPictureImg.src = photos.url;
  bigPictureLikes.textContent = photos.likes;
  bigPictureComments.textContent = photos.commemts.length;
};

// показать модальное окно

const showModal = (item, photo) => {

  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    createBigPicture(photo);
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
  });

};

//закрываеm модальное окно

const close = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);

};

const closeModal = () => {
  bigPictureClose.addEventListener('click', close);
};

//закрываем модальное окно с клавиатуры

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    close();
  }
}

export {showModal, closeModal};
