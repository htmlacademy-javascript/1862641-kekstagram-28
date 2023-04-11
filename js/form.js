import { isEscapeKey } from './util.js';
import { reset } from './scale.js';
import {resetEffects} from './effects.js';
import { getErrorMessage, getSuccessMessage } from './succses-error-window.js';

const uploadFile = document.querySelector('#upload-file');
const formUpload = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const imgForm = document.querySelector('.img-upload__form');
const hashtagInput = imgForm.querySelector('.text__hashtags');
const commentInput = imgForm.querySelector('.text__description');
const formSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const blockSubmitButton = () => {
  formSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  formSubmit.disabled = false;
};

const getHashtags = (value) => value.trim().split(/\s+/);

pristine.addValidator(hashtagInput, (value) =>{
  const hashtags = getHashtags(value);

  if(hashtags.length > 5) {
    return false;
  }
  return true;
}, 'Хештегов не может быть больше 5', 2, false);

pristine.addValidator(hashtagInput, (value) =>{
  const hashtags = getHashtags(value);
  if(hashtags.length === 1 && !hashtags[0]) {
    return true;
  }

  const hashtagRegax = /^#[a-zа-яё0-9]{1,19}$/i;

  for(const hashtag of hashtags) {
    if(!hashtagRegax.test(hashtag)){
      blockSubmitButton();
      return false;
    }
  }
  unblockSubmitButton();
  return true;
}, 'Некоректная запись', 2, false);

pristine.addValidator(hashtagInput, (value) =>{
  const hashtags = getHashtags(value);

  for(let i = 0; i < hashtags.length; i++) {

    for (let j = 0; j < hashtags.length; j++){

      if(i === j) {
        continue;
      }

      if (hashtags[j] === hashtags[i]) {
        blockSubmitButton();
        return false;
      }
    }
  }
  unblockSubmitButton();
  return true;
}, 'Хештеги не должны повторяться', 2, false);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const valid = pristine.validate();
  if(valid) {
    const formData = new FormData(evt.target);
    fetch(
      'https://28.javascript.pages.academy/kekstagram', {
        method: 'POST',
        body: formData,

      },)

      .then((response) => {
        if(response.ok) {
          getSuccessMessage();
          closePhotoEditor();
        } else {
          getErrorMessage();
        }
      });
  }
});


const deleteKeydownFocus = (value) => {
  value.addEventListener('focus', () =>{
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  value.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const showPhotoEditor = () => {

  formUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  deleteKeydownFocus(hashtagInput);
  deleteKeydownFocus(commentInput);

};

uploadFile.addEventListener('change', showPhotoEditor);


function closePhotoEditor (){
  reset();
  resetEffects();
  formUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgForm.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
}

closeButton.addEventListener('click',closePhotoEditor);

