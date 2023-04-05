const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const userFile = document.querySelector('.img-upload__start input[type=file]');
const userImg = document.querySelector('.img-upload__preview img');

userFile.addEventListener('change', ()=>{
  const file = userFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    userImg.src = URL.createObjectURL(file);
  }
});
