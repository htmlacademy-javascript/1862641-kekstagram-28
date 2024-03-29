import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureonModalClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentCount = document.querySelector ('.social__comment-count');
const showCommentButton = document.querySelector('.comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const captionPhoto = document.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');

let currentCommentIndex = 0;

const createCommentItem = (comment) => {
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

const addCommentsToDom = (from, to, comments) => {
  let lastComment;

  if(from > comments.length - 1) {
    return;
  }

  if (to > comments.length - 1) {
    lastComment = comments.length;
    showCommentButton.style.display = 'none';
  } else {
    lastComment = to;
  }

  currentCommentIndex = lastComment;

  for (let i = from; i < lastComment; i++) {
    const itemComment = createCommentItem(comments[i]);
    commentsList.appendChild(itemComment);
  }
  commentCount.textContent = `${currentCommentIndex} из ${comments.length} комментариев`;

};

const createBigPicture = (photos) => {
  addCommentsToDom(0, 5, photos.comments);
  bigPictureImg.src = photos.url;
  captionPhoto.textContent = photos.description;
  bigPictureLikes.textContent = photos.likes;

};

// показать модальное окно

const showModal = (item, photo) => {

  item.addEventListener('click', (e) => {
    e.preventDefault();
    showCommentButton.style.display = 'block';
    const showMoreComment = () => {

      const addedCommentCount = 5;
      addCommentsToDom(currentCommentIndex, currentCommentIndex + addedCommentCount, photo.comments);

    };

    const onModalClose = () => {
      const socialComments = document.querySelectorAll('.social__comment');
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      showCommentButton.removeEventListener('click', showMoreComment);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onModalClose);
      for (const socialComment of socialComments) {
        socialComment.remove();
      }
      currentCommentIndex = 0;
    };

    function onDocumentKeydown (evt) {
      if(isEscapeKey(evt)) {
        bigPicture.classList.add('hidden');
        onModalClose();
      }
    }

    showCommentButton.addEventListener('click',showMoreComment);
    createBigPicture(photo);
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureonModalClose.addEventListener('click', onModalClose);

  });

};


export {showModal};
