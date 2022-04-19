const url = 'https://api.icndb.com/jokes/random';
const quotes = document.querySelector('.quotes');
const btn = document.querySelector('.btn-quotes');
const laught = document.querySelector('.laught');
const chuck = document.querySelector('.chuck-img');
const test = document.querySelector('.test');
const languages = document.querySelector('.languages');
const en = document.querySelector('.en');
const be = document.querySelector('.be');
const author = document.querySelector('.author');
const vershi = document.querySelector('.vershi-img');

languages.addEventListener('click', (e) => {
   if (en.classList.contains('active')) {
      en.classList.remove('active');
      
   }
   if (be.classList.contains('active')) {
      be.classList.remove('active');
   }
   setTimeout(() => {
      e.target.classList.add('active');
      if (e.target.classList.contains('en')) {
         btn.innerHTML = "Make me laugh chuck!";
         vershi.style.opacity = 0;
      }
      if (e.target.classList.contains('be')) {
         btn.innerHTML = "цытата на роднай мове";
         vershi.style.opacity = 1;
      }
   }, 0)
})

async function getData() {
   const res = await fetch(url);
   const data = await res.json();
   quotes.innerHTML = data.value.joke;
   laught.currentTime = 0;
   laught.play();
   chuck.classList.add('shake');
   setTimeout(() => {
      chuck.classList.remove('shake');
   }, 2500)
}

getData();

async function getDataBe() {
   let randomNum = Math.floor(Math.random() * 309); 
   const res = await fetch('../quotes.json');
   const data = await res.json();
   quotes.innerHTML = `${data[randomNum].text} (${data[randomNum].author})`;
}

btn.addEventListener('click', () => {
   if (en.classList.contains('active')) {
      getData();
   }
   if (be.classList.contains('active')) {
      getDataBe();
   }
});

console.log('score: 70 / 60 \n \n Вёрстка +10 \n на странице есть цитата и кнопка для смены цитаты +5 \n в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 \n При загрузке страницы приложения отображается рандомная цитата +10 \n При перезагрузке страницы цитата обновляется (заменяется на другую) +10 \n Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10 \n Смена цитаты сопровождается любым другим эффектом, например, изменяется изображение или меняется фоновый цвет страницы, или проигрывается звук и т.д * +10 \n Можно выбрать один из двух языков отображения цитат: en/ru или en/be ** +10 \n Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 ');