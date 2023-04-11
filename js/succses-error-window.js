import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

const onAreaWindowClose = (evt) => {
  if (evt.target.closest('section')) {
    onWindowErrorClose();
  }
};

function onWindowErrorClose () {
  const errorSectionElement = document.querySelector('.error');
  const successSectionElement = document.querySelector('.success');


  if (successSectionElement) {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onAreaWindowClose);
    successButton.removeEventListener('click', onWindowErrorClose);
    successSectionElement.remove();
  }

  if (errorSectionElement) {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onAreaWindowClose);
    errorButton.removeEventListener('click', onWindowErrorClose);
    errorSectionElement.remove();
  }
  document.addEventListener('keydown', onDocumentKeydown);
}

const getSuccessMessage = () => {
  const elementSuccessMessage = successMessageElement.cloneNode(true);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onAreaWindowClose);
  successButton.addEventListener('click', onWindowErrorClose);
  bodyElement.append(elementSuccessMessage);
  bodyElement.style.overflow = 'hidden';
};

const getErrorMessage = () => {
  const elementErrorMessage = errorMessageElement.cloneNode(true);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onAreaWindowClose);
  errorButton.addEventListener('click', onWindowErrorClose);
  bodyElement.append(elementErrorMessage);
  bodyElement.style.overflow = 'hidden';
};


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onWindowErrorClose();
  }
}

export {getSuccessMessage, getErrorMessage};

