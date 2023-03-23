import { create } from './data.js';

const picture = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const newItem = pictureTemplate.querySelector('.picture');

//создаем новый элемент

const createPhoto = () => {
  const photos = create();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length ; i++) {

    const item = newItem.cloneNode(true);
    const img = item.querySelector('.picture__img');
    const commentCount = item.querySelector('.picture__comments');
    const likeCount = item.querySelector('.picture__likes');
    likeCount.textContent = photos[i].likes;
    commentCount.textContent = photos[i].commemts.length;
    img.src = photos[i].url;
    fragment.appendChild(item);
  }
  picture.appendChild(fragment);

};
createPhoto ();

export {createPhoto};
