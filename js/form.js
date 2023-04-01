import { isEscapeKey } from './util.js';

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

const getHastags = (value) => value.trim().split(/\s+/);

pristine.addValidator(hashtagInput, (value) =>{
  const hashtags = getHastags(value);

  if(hashtags.length > 5) {
    formSubmit.addAttribute('disabled');
    return false;
  }
  return true;
}, 'Хештегов не может быть больше 5', 2, false);

pristine.addValidator(hashtagInput, (value) =>{
  const hashtags = getHastags(value);

  for(const hashtag of hashtags) {
    if(hashtag[0] !== '#'){
      return false;
    }
  }

  return true;
}, 'Хештег должен содержать #', 2, false);

pristine.addValidator(hashtagInput, (value) =>{
  const hashtags = getHastags(value);
  const hashtagRegax = /^#[a-zа-яё0-9]{1,19}$/i;

  for(const hashtag of hashtags) {
    if(!hashtagRegax.test(hashtag)){
      return false;
    }
  }

  return true;
}, 'Некоректная запись', 2, false);

pristine.addValidator(hashtagInput, (value) =>{
  const hashtags = getHastags(value);

  for(let i = 0; i < hashtags.length; i++) {

    for (let j = 0; j < hashtags.length; j++){

      if(i === j) {
        continue;
      }

      if (hashtags[j] === hashtags[i]) {
        return false;
      }
    }
  }

  return true;
}, 'Хештеги не должны повторяться', 2, false);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

imgForm.addEventListener('submit', (evt) => {
  const valid = pristine.validate();
  if(!valid) {
    evt.preventDefault();
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

  formUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgForm.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click',closePhotoEditor);

