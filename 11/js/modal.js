import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

let currentCommentIndex = 0;


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

const addComentsToDom = (from, to, comments) => {
  const commentsList = bigPicture.querySelector('.social__comments');
  let lastComment;

  if(from > comments.length - 1) {

    return;
  }

  if (to > comments.length - 1) {
    lastComment = comments.length;
  } else {
    lastComment = to;
  }

  currentCommentIndex = lastComment;

  for (let i = from; i < lastComment; i++) {
    const itemComment = createCommemtItem(comments[i]);
    commentsList.appendChild(itemComment);
  }
};

const showMoreComment = (comment) => {
  const showCommentButton = document.querySelector('.comments-loader');
  const addedCommentCount = 5;

  showCommentButton.addEventListener('click', () => {
    addComentsToDom(currentCommentIndex, currentCommentIndex + addedCommentCount, comment);
  });
};

const createBigPicture = (photos) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const captionPhoto = document.querySelector('.social__caption');
  const bigPictureComments = bigPicture.querySelector('.comments-count');

  addComentsToDom(0, 5, photos.commemts);
  showMoreComment(photos.commemts);
  bigPictureImg.src = photos.url;
  captionPhoto.textContent = photos.desription;
  bigPictureLikes.textContent = photos.likes;
  bigPictureComments.textContent = photos.commemts.length;

};

// показать модальное окно

const showModal = (item, photo) => {

  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    createBigPicture(photo);
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
  });

};

//закрываеm модальное окно

const close = () => {
  const socialComments = document.querySelectorAll('.social__comment');

  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', close);
  for (const socialComment of socialComments) {
    socialComment.remove();
  }
  currentCommentIndex = 0;
};

//закрываем модальное окно с клавиатуры

function onDocumentKeydown (evt) {
  if(isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    close();
  }
}

const init = () => {
  bigPictureClose.addEventListener('click', close);

};

export {showModal, init};
