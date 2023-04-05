const scaleControlnput = document.querySelector('.scale__control--value');
const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const imgUpload = document.querySelector('.img-upload__preview img');
const DEFAULT_SCALE = 100;

const scaleImgUpload = (value) => {
  imgUpload.style.transform = `scale(${value / 100})`;
  scaleControlnput.value = `${value}%`;
};

const onButtonSmallerClick = () => {
  const scaleInputValue = parseInt(scaleControlnput.value, 10);
  let inputValueNew = scaleInputValue - 25;
  if(inputValueNew < 25) {
    inputValueNew = 25;
  }
  scaleImgUpload (inputValueNew);
};

const onButtonBiggerClick = () => {
  const scaleInputValue = parseInt(scaleControlnput.value, 10);
  let inputValueNew = scaleInputValue + 25;
  if(inputValueNew > 100) {
    inputValueNew = 100;
  }
  scaleImgUpload (inputValueNew);
};

scaleButtonSmaller.addEventListener('click',onButtonSmallerClick);
scaleButtonBigger.addEventListener('click',onButtonBiggerClick);

const reset = () => scaleImgUpload(DEFAULT_SCALE);

export {reset};
