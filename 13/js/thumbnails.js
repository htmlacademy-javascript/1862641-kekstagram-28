import {showModal} from './modal.js';
const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const newItem = pictureTemplate.querySelector('.picture');

//создаем новый элемент

const createPhotos = (photos) => {
  const arrayPhotos = [];

  for (let i = 0; i < photos.length ; i++) {

    const item = newItem.cloneNode(true);
    const img = item.querySelector('.picture__img');
    const commentCount = item.querySelector('.picture__comments');
    const likeCount = item.querySelector('.picture__likes');
    likeCount.textContent = photos[i].likes;
    commentCount.textContent = photos[i].commemts.length;
    img.src = photos[i].url;
    showModal(item, photos[i]);
    arrayPhotos.push(item);
  }

  return arrayPhotos;

};

const appendsPhoto = (items) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < items.length; i++) {
    fragment.appendChild(items[i]);
  }
  picture.appendChild(fragment);

};

export {createPhotos, appendsPhoto};
