const porfolioBtnsArray = document.querySelectorAll('.portfolio__btn'); 
const portfolioImages = document.querySelectorAll('.portfolio__img');


export const changeTimeOfYear = (e) => {
   if (e.target.classList.contains('portfolio__btn')) {
      porfolioBtnsArray.forEach((el) => {
         el.classList.remove('btn-active');
      })
      e.target.classList.add('btn-active');
      portfolioImages.forEach((img, index) => img.src = `./img/${e.target.dataset.season}/${index + 1}.jpg`);
   }
}