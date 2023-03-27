import { create } from './data.js';
import {createPhotos, appendsPhoto} from './thumbnails.js';
import {init} from './modal.js';

const photosData = create();
const photosView = createPhotos(photosData);
appendsPhoto(photosView);
init();
