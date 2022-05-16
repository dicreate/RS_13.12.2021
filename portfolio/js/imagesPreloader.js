export const imagesPreloader = (images) => {
   images.forEach((el) => {
      for(let i = 1; i <= 6; i++) {
         const img = new Image();
         img.src = `../img/${el}/${i}.jpg`;
      }
   })
}