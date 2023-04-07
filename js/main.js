import { getData } from './photos-api.js';
import {createPhotos, appendsPhoto, clearPhotos} from './thumbnails.js';
import {shuffle, debounce} from './util.js';
import {changeActiceButton} from './button-sort.js';
import './form.js';
import './scale.js';
import './user-photo.js';
import './effects.js';
import './succses-error-window.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterPopular = document.querySelector('#filter-discussed');

changeActiceButton();

const createGallery = (data) => {
  const photosView = createPhotos(data);
  appendsPhoto(photosView);
};

getData().then((data) => {

  createGallery(data);

  filterDefault.addEventListener('click', () => {
    clearPhotos();
    debounce(createGallery(data), 500);

  });

  filterRandom.addEventListener('click', () => {
    clearPhotos();
    const photos = data.slice();
    shuffle(photos);
    const slizedData = photos.slice(0, 10);
    debounce(createGallery(slizedData), 500);
  });

  filterPopular.addEventListener('click', () => {
    clearPhotos();
    const photos = data.slice();
    photos.sort((a, b)=>
      b.comments.length - a.comments.length
    );
    debounce(createGallery(photos), 500);

  });
});

