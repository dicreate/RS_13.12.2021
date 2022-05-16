import { getTranslate } from "./i18n.js";
import { changeTimeOfYear } from "./changeTimeOfYear.js";
import { imagesPreloader } from "./imagesPreloader.js";
import './videoPlayer.js'

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav__menu');
const blackOut = document.querySelector('.blackout');
const portfolioBtns = document.querySelector('.portfolio__btns');
const topicBtn = document.querySelectorAll('.topic');
const iconLight = document.querySelector('.topic-light');
const iconDark = document.querySelector('.topic-dark');
const topicElementsClassList = ['.hero', '.contacts'];
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const topicElements = document.querySelectorAll(topicElementsClassList);
let topic;

imagesPreloader(seasons);

portfolioBtns.addEventListener('click', changeTimeOfYear);

hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('is-active');
   navMenu.classList.toggle('open');
   blackOut.classList.toggle('visible');
});

navMenu.addEventListener('click', (e) => {
   if (e.target.classList.contains('nav__link')) {
      hamburger.classList.remove('is-active');
      navMenu.classList.remove('open');
      blackOut.classList.remove('visible');
   }
});

const changeTopic = (topic) => {
   if (topic == 'topic-light') {
      topicElements.forEach(el => el.classList.add('light'));
      document.documentElement.style.setProperty('--backgroundColor', '#FFFFFF');
      document.documentElement.style.setProperty('--bodyColor', '#1C1C1C');
      document.documentElement.style.setProperty('--hoverColor', '#FFF');
      document.documentElement.style.setProperty('--btnHoverColor', '#BDAE82');
      document.documentElement.style.setProperty('--titleColor', '#1C1C1C');
      document.documentElement.style.setProperty('--portfolioBtnsBgColor', '#BDAE82');
      document.documentElement.style.setProperty('--portfolioBtnsActiveColor', '#BDAE82');
      document.documentElement.style.setProperty('--contactsFormBg', 'rgba(255, 255, 255, 0.5)');
      iconLight.style.display = 'none';
      iconDark.style.display = 'block';
   }
   if (topic == 'topic-dark') {
      topicElements.forEach(el => el.classList.remove('light'));
      document.documentElement.style.setProperty('--backgroundColor', '#000000');
      document.documentElement.style.setProperty('--bodyColor', '#FFFFFF');
      document.documentElement.style.setProperty('--hoverColor', '#BDAE82');
      document.documentElement.style.setProperty('--btnHoverColor', '#FFF');
      document.documentElement.style.setProperty('--titleColor', '#BDAE82');
      document.documentElement.style.setProperty('--portfolioBtnsBgColor', 'none');
      document.documentElement.style.setProperty('--portfolioBtnsActiveColor', '#000');
      document.documentElement.style.setProperty('--contactsFormBg', 'rgba(0, 0, 0, 0.5)');
      iconLight.style.display = 'block';
      iconDark.style.display = 'none';
   }
}

topicBtn.forEach((el) => el.addEventListener('click', () => {

   if (el.classList.contains('topic-light')) {
      topic = 'topic-light';
      localStorage.setItem('topic', topic);
      changeTopic(topic);
   }
   if (el.classList.contains('topic-dark')) {
      topic = 'topic-dark';
      localStorage.setItem('topic', topic);
      changeTopic(topic);
   }
}))

function getLocalStorage() {
   if(localStorage.getItem('lang')) {
      let lang = localStorage.getItem('lang');
      getTranslate(lang);
   }
   if (localStorage.getItem('topic')) {
      topic = localStorage.getItem('topic');
      changeTopic(topic);
   }
}
window.addEventListener('load', getLocalStorage)



/* 
function stop() {
   video.pause();
   video.currentTime = 0;
}

function speedUp() {
   video.playbackRate = 2;   
}

function speedDown() {
   video.playbackRate = 0.5;   
}

function speedNormal() {
   video.playbackRate = 1;
}
} */
const video = document.querySelector('.player__video');
const videoBtn = document.querySelector('.player__btn');
const poster = document.querySelector('.player__poster');
const playIcon = document.querySelector('.play-icon');
const progress = document.querySelector('.progress');
const videoVolume = document.querySelector('.volume');
const volumeIcon = document.querySelector('.volume-icon');
const fullScreen = document.querySelector('.full-screen');
const videoPlayer = document.querySelector('.player');
let isPlay = false;
let v = 40;

videoBtn.onclick = play;
playIcon.onclick = play;
video.onclick = play;
video.ontimeupdate = progressUpdate;
progress.onclick = videoRewind;
videoVolume.oninput = changeVolume;
volumeIcon.onclick = toggleVolume;
progress.ontimeupdate = changeProgress;
progress.addEventListener('input', changeProgress);

function play() {
   poster.classList.add('isPlay');
   playIcon.classList.toggle('pause');

   if (!isPlay) {
      video.play();
      videoBtn.style.display = 'none';
      isPlay = true;
   }
   else {
      video.pause();
      videoBtn.style.display = 'block';
      isPlay = false;
   }
}

function progressUpdate() {
   let duration = video.duration;
   let current = video.currentTime;
   progress.value = 100 * current / duration;
   progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progress.value}%, #c8c8c8 ${progress.value}%, #c8c8c8 100%)`;
}

function videoRewind(e) {
   let w = this.offsetWidth;
   let o = e.offsetX;
   this.value = 100 * o / w; 
   video.pause();
   video.currentTime = video.duration * o / w;
   video.play();
}

function changeVolume() {
   v = this.value;
   video.volume = v / 100;
   if (v == 0 && !volumeIcon.classList.contains('mute')) {
      volumeIcon.classList.add('mute');
   }
   else if (v != 0 && volumeIcon.classList.contains('mute')) {
      volumeIcon.classList.remove('mute');
   }
   videoVolume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${v}%, #c8c8c8 ${v}%, #c8c8c8 100%)`;
}

function toggleVolume() {
   volumeIcon.classList.toggle('mute');
   if (volumeIcon.classList.contains('mute')) {
      video.volume = 0;
   }
   if (!volumeIcon.classList.contains('mute')) {
      video.volume = v / 100;
   }
}

function changeProgress() {
   let value = this.value;
   this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100%)`;
}

fullScreen.addEventListener('click',toggleScreen);
function toggleScreen() {
   video.classList.toggle('full');
   if (!document.fullscreenElement) {
      videoPlayer.requestFullscreen();   
   }
   else {
      document.exitFullscreen();
   }
}