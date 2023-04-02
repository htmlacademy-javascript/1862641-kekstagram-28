import { create } from './data.js';
import {createPhotos, appendsPhoto} from './thumbnails.js';
import './form.js';
import './scale.js';
import './user-photo.js';
import './effects.js';

const photosData = create();
const photosView = createPhotos(photosData);
appendsPhoto(photosView);
