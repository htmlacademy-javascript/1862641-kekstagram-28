import { getData } from './photos-api.js';
import {createPhotos, appendsPhoto, clearPhotos} from './thumbnails.js';
import {shuffle, debounce} from './util.js';
const TIME_OUT = 500;

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterPopular = document.querySelector('#filter-discussed');

const createGallery = (data) => {
  const photosView = createPhotos(data);
  appendsPhoto(photosView);
};

getData().then((data) => {

  debounce(createGallery(data), TIME_OUT);

  filterDefault.addEventListener('click', () => {
    clearPhotos();
    debounce(createGallery(data), TIME_OUT);
  });

  filterRandom.addEventListener('click', () => {
    clearPhotos();
    const photos = data.slice();
    shuffle(photos);
    const slizedData = photos.slice(0, 10);
    debounce(createGallery(slizedData), TIME_OUT);
  });

  filterPopular.addEventListener('click', () => {
    clearPhotos();
    const photos = data.slice();
    photos.sort((a, b)=>
      b.comments.length - a.comments.length
    );
    debounce(createGallery(photos), TIME_OUT);

  });
});
