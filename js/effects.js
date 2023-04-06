
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const pictureEffects = document.querySelector('.img-upload__effects');
const userImg = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let filterValue = '';
let activeEffect = 'none';

const hideSlider = () => {
  sliderContainer.setAttribute('hidden', 'hidden');
};

const showSlider = () => {
  sliderContainer.removeAttribute('hidden');
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

  if (activeEffect === 'chrome') {
    filterValue = `grayscale(${sliderValue})`;
  } else if (activeEffect === 'sepia') {
    filterValue = `sepia(${sliderValue})`;
  } else if (activeEffect === 'marvin') {
    filterValue = `invert(${sliderValue}%)`;
  } else if (activeEffect === 'phobos') {
    filterValue = `blur(${sliderValue}px)`;
  } else if (activeEffect === 'heat') {
    filterValue = `brightness(${sliderValue})`;
  }else if (activeEffect !== 'none') {
    userImg.setAttribute('style', `filter: ${filterValue}`);
  }
});

const showPictureEffectSlider = (evt) => {
  const effect = evt.target.closest('input[type="radio"]').value;
  activeEffect = effect;

  if (effect === 'none') {
    hideSlider();
  } else {
    showSlider();
  }

  userImg.className = `effects__preview--${effect}`;

  updateSlider(effect);
};

pictureEffects.addEventListener('change', showPictureEffectSlider);

hideSlider();

export { resetEffects };
