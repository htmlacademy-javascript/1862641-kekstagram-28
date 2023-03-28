import { create } from './data.js';
import {createPhotos, appendsPhoto} from './thumbnails.js';

const photosData = create();
const photosView = createPhotos(photosData);
appendsPhoto(photosView);
