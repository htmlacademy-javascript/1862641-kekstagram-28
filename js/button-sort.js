const sortForm = document.querySelector('.img-filters__form');

const changeActiceButton = () => {
  sortForm.onclick = function(e){
    for(let i = 0 ; i < sortForm.children.length; i++){
      sortForm.children[i].classList.remove('img-filters__button--active');
    }
    e.target.classList.add('img-filters__button--active');
  };
};


export {changeActiceButton};
