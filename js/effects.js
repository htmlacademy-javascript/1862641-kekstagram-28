const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const pictureEffects = document.querySelector('.img-upload__effects');
const userImg = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let filterValue = '';
let activeEffect = '';

const hideSlider = () => {
  sliderContainer.hidden = true;
};

const updateSlider = (value) => {
  if (value === 'none') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  if (value === 'chrome' || value === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (value === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  if (value === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  if (value === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
};

const resetEffects = () => {
  userImg.classList.remove(userImg.classList[0]);
  updateSlider('none');
  userImg.removeAttribute('style', `filter: ${filterValue}`);
  hideSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  valueElement.value = sliderValue;

  if (activeEffect !== 'none') {
    userImg.setAttribute('style', `filter: ${filterValue}`);
  } else {
    userImg.removeAttribute('style', `filter: ${filterValue}`);
  }

  switch (activeEffect) {
    case 'chrome':
      filterValue = `grayscale(${sliderValue})`;
      break;
    case 'sepia':
      filterValue = `sepia(${sliderValue})`;
      break;
    case 'marvin':
      filterValue = `invert(${sliderValue}%)`;
      break;
    case 'phobos':
      filterValue = `blur(${sliderValue}px)`;
      break;
    case 'heat':
      filterValue = `brightness(${sliderValue})`;
      break;

    default:
      userImg.removeAttribute('style', `filter: ${filterValue}`);
  }

});

const onEffectsPictureChange = (evt) => {
  const effect = evt.target.closest('input[type="radio"]').value;
  activeEffect = effect;

  sliderContainer.hidden = effect === 'none';

  userImg.className = `effects__preview--${effect}`;

  updateSlider(effect);
};

pictureEffects.addEventListener('change', onEffectsPictureChange);

hideSlider();

export { resetEffects };
