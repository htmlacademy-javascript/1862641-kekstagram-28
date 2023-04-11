import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onWindowClose();
  }
}

const onAreaWindowClose = (evt) => {
  if (evt.target.closest('section')) {
    onWindowClose();
  }
};

const getSuccessMessage = () => {
  const elementSuccessMessage = successMessageElement.cloneNode(true);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onAreaWindowClose);
  successButton.addEventListener('click', onWindowClose);
  bodyElement.append(elementSuccessMessage);
  bodyElement.style.overflow = 'hidden';
};

const getErrorMessage = () => {
  const elementErrorMessage = errorMessageElement.cloneNode(true);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onAreaWindowClose);
  errorButton.addEventListener('click', onWindowClose);
  bodyElement.append(elementErrorMessage);
  bodyElement.style.overflow = 'hidden';
};

function onWindowClose () {
  const errorSectionElement = document.querySelector('.error');
  const successSectionElement = document.querySelector('.success');


  if (successSectionElement) {
    document.removeEventListener('keydown', onDocumentKeydown);
    successButton.removeEventListener('click', onWindowClose);
    document.removeEventListener('click', onAreaWindowClose);
    successSectionElement.remove();
  }

  if (errorSectionElement) {
    document.removeEventListener('keydown', onDocumentKeydown);
    errorButton.removeEventListener('click', onWindowClose);
    document.removeEventListener('click', onAreaWindowClose);
    errorSectionElement.remove();
  }
}

export {getSuccessMessage, getErrorMessage};

