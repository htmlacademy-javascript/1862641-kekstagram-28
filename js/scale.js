const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const scaleControlnput = document.querySelector('.scale__control--value');
const scaleOutButton = document.querySelector('.scale__control--smaller');
const scaleInButton = document.querySelector('.scale__control--bigger');
const imgUpload = document.querySelector('.img-upload__preview img');

const scaleImgUpload = (value) => {
  imgUpload.style.transform = `scale(${value / DEFAULT_SCALE})`;
  scaleControlnput.value = `${value}%`;
};

const onButtonSmallerClick = () => {
  const scaleInputValue = parseInt(scaleControlnput.value, 10);
  let inputValueNew = scaleInputValue - MIN_SCALE;
  if(inputValueNew < MIN_SCALE) {
    inputValueNew = MIN_SCALE;
  }
  scaleImgUpload (inputValueNew);
};

const onButtonBiggerClick = () => {
  const scaleInputValue = parseInt(scaleControlnput.value, 10);
  let inputValueNew = scaleInputValue + MIN_SCALE;
  if(inputValueNew > DEFAULT_SCALE) {
    inputValueNew = DEFAULT_SCALE;
  }
  scaleImgUpload (inputValueNew);
};

scaleOutButton.addEventListener('click',onButtonSmallerClick);
scaleInButton.addEventListener('click',onButtonBiggerClick);

const reset = () => scaleImgUpload(DEFAULT_SCALE);

export {reset};
