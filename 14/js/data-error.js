const errorMessage = (message) => {
  const documentFragment = document.createDocumentFragment();
  const errorsContainer = document.createElement('div');
  if (!document.querySelector('.error-container')) {
    documentFragment.appendChild(errorsContainer);
    errorsContainer.classList.add('error-container');
    errorsContainer.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      height: 100vh;
      display: block;
    `;
    const mainTag = document.querySelector('main');
    mainTag.appendChild(errorsContainer);
  }
  const errorContainer = document.createElement('div');
  errorsContainer.appendChild(errorContainer);
  errorContainer.classList.add('error-element');
  errorContainer.style.cssText = `
      background-color: #bd2a2e;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 50px;
      max-height: 200px;
      z-index: 10;
  `;
  const errorText = document.createElement('p');
  errorContainer.appendChild(errorText);
  errorText.textContent = message;
};

export {errorMessage};
