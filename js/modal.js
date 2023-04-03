import { isEscapeKey } from './util.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentCount = document.querySelector ('.social__comment-count');
const showCommentButton = document.querySelector('.comments-loader');

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
    showCommentButton.style.display = 'none';
  } else {
    lastComment = to;
  }

  currentCommentIndex = lastComment;

  for (let i = from; i < lastComment; i++) {
    const itemComment = createCommemtItem(comments[i]);
    commentsList.appendChild(itemComment);
  }
  commentCount.innerHTML = `${currentCommentIndex} из <span class="comments-count">${comments.length}</span> комментариев`;

};

const createBigPicture = (photos) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const captionPhoto = document.querySelector('.social__caption');
  addComentsToDom(0, 5, photos.commemts);
  bigPictureImg.src = photos.url;
  captionPhoto.textContent = photos.desription;
  bigPictureLikes.textContent = photos.likes;

};

// показать модальное окно

const showModal = (item, photo) => {

  item.addEventListener('click', (e) => {
    e.preventDefault();
    showCommentButton.style.display = 'block';
    const showMoreComment = () => {

      const addedCommentCount = 5;
      addComentsToDom(currentCommentIndex, currentCommentIndex + addedCommentCount, photo.commemts);

    };

    const close = () => {
      const socialComments = document.querySelectorAll('.social__comment');
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      showCommentButton.removeEventListener('click', showMoreComment);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', close);
      for (const socialComment of socialComments) {
        socialComment.remove();
      }
      currentCommentIndex = 0;
    };

    function onDocumentKeydown (evt) {
      if(isEscapeKey(evt)) {
        bigPicture.classList.add('hidden');
        close();
      }
    }

    showCommentButton.addEventListener('click',showMoreComment);
    createBigPicture(photo);
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureClose.addEventListener('click', close);

  });

};

export {showModal};
