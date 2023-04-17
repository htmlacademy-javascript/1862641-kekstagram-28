import { isEscapeKey } from './util.js';

const bodyElement = document.querySelector('body');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const successButton = document.querySelector('#success').content.querySelector('.success__button');
const errorButton = document.querySelector('#error').content.querySelector('.error__button');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onSuccessButtonClick();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target.closest('section')) {
    onSuccessButtonClick();
  }
};

const getSuccessMessage = () => {
  const elementSuccessMessage = successMessageElement.cloneNode(true);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  successButton.addEventListener('click', onSuccessButtonClick);
  bodyElement.append(elementSuccessMessage);
  bodyElement.style.overflow = 'hidden';
};

const getErrorMessage = () => {
  const elementErrorMessage = errorMessageElement.cloneNode(true);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  errorButton.addEventListener('click', onSuccessButtonClick);
  bodyElement.append(elementErrorMessage);
  bodyElement.style.overflow = 'hidden';
};

function onSuccessButtonClick () {
  const errorSectionElement = document.querySelector('.error');
  const successSectionElement = document.querySelector('.success');


  if (successSectionElement) {
    document.removeEventListener('keydown', onDocumentKeydown);
    successButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('click', onDocumentClick);
    successSectionElement.remove();
  }

  if (errorSectionElement) {
    document.removeEventListener('keydown', onDocumentKeydown);
    errorButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('click', onDocumentClick);
    errorSectionElement.remove();
  }
}

export {getSuccessMessage, getErrorMessage};

