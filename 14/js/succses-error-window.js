import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
};

function onWindowErrorClose () {
  const successSectionElement = document.querySelector('.success');
  const errorSectionElement = document.querySelector('.error');


  if (successSectionElement) {
    successSectionElement.remove();
  }

  if (errorSectionElement) {
    errorSectionElement.remove();
  }
  document.addEventListener('keydown', onDocumentKeydown);
}

const onAreaWindowClose = (evt) => {
  if (evt.target.closest('section')) {
    onWindowErrorClose();
  }
};

const onErrorClickEsc = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onWindowErrorClose();
  }
};

const getSuccessMessage = () => {
  const elementSuccessMessage = successMessageElement.cloneNode(true);
  document.addEventListener('keydown', onErrorClickEsc);
  document.addEventListener('click', onAreaWindowClose);
  successButton.addEventListener('click', onWindowErrorClose);
  bodyElement.append(elementSuccessMessage);
  bodyElement.style.overflow = 'hidden';
};

const getErrorMessage = () => {
  const elementErrorMessage = errorMessageElement.cloneNode(true);
  document.addEventListener('keydown', onWindowErrorClose);
  document.addEventListener('click', onAreaWindowClose);
  errorButton.addEventListener('click', onDocumentKeydown);
  bodyElement.append(elementErrorMessage);
  bodyElement.style.overflow = 'hidden';
  document.removeEventListener('keydown', onDocumentKeydown);
};

export {getSuccessMessage, getErrorMessage};

