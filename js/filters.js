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


const createGalleryDebounce = debounce(createGallery, TIME_OUT);

getData().then((data) => {

  createGallery(data);

  filterDefault.addEventListener('click', () => {
    clearPhotos();
    createGalleryDebounce(data);
  });

  filterRandom.addEventListener('click', () => {
    clearPhotos();
    const photos = data.slice();
    shuffle(photos);
    const slicedData = photos.slice(0, 10);
    createGalleryDebounce(slicedData);
  });

  filterPopular.addEventListener('click', () => {
    clearPhotos();
    const photos = data.slice();
    photos.sort((a, b)=>
      b.comments.length - a.comments.length
    );
    createGalleryDebounce(photos);

  });
});
