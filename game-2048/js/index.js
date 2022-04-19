const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const retryBtn = document.querySelector('.retry');
const gridEnd = document.querySelector('.grid-end');
const gridMessage = document.querySelector('.grid-message');
const scoreEnd = document.querySelector('.score-end');
const audioClick = document.querySelector('.audio-click');
const audioEnd = document.querySelector('.audio-end');
const newGameBtn = document.querySelector('.new-game');
const scoreList = document.querySelector('.score-list');
const cupIcon = document.querySelector('.cup-icon');
const scoreListContainer = document.querySelector('.score-wrapper');

const width = 4;
let squares = [];
let square;
let randomNumber;
let randomValue;
let firstValue;
let secondValue;
let thirdValue;
let fourthValue;
let row;
let column;
let filteredRow;
let filteredColumn;
let zerosCount;
let zeroSquares;
let newRow;
let newColumn;
let sumOfSqures;
let score = 0;
let bestScores = [];
let isGameOver = false;

function uploadingBestResults() {
   if (localStorage.getItem('bestScores')) {
      bestScores = JSON.parse(localStorage.getItem('bestScores'));
   } else {
      bestScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
   }
}


function createBestScores() {
   for (let i = 0; i < 10; i++) {
      let scoreElement = document.createElement('li');
      scoreElement.innerHTML = `${i+1}. ${bestScores[i]}`;
      scoreList.appendChild(scoreElement);
   }
}

function checkSquareValue() {
   squares.forEach(el => {
      if (el.innerHTML == 0) {
         el.style.fontSize = 0;
         el.style.backgroundColor = 'rgba(238,228,218,.35)';
      } else if (el.innerHTML == 2 || el.innerHTML == 4) {
         el.style.fontSize = '53px';
         el.style.backgroundColor = '#eee4da';
         el.style.color = '#776E65';
      } else if (el.innerHTML == 8) {
         el.style.backgroundColor = '#f2b179';
         el.style.color = '#f9f6f2';
         el.style.fontSize = '53px';
      } else if (el.innerHTML == 16) {
         el.style.backgroundColor = '#f59563';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      } else if (el.innerHTML == 32) {
         el.style.backgroundColor = '#f59563';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      } else if (el.innerHTML == 64) {
         el.style.backgroundColor = '#f65e3b';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      } else if (el.innerHTML == 128) {
         el.style.backgroundColor = '#edcf72';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      } else if (el.innerHTML == 256) {
         el.style.backgroundColor = '#e7bc3c';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      } else if (el.innerHTML == 512) {
         el.style.backgroundColor = '#e4b423';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      }  else if (el.innerHTML == 1024) {
         el.style.backgroundColor = '#dfac13';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      } else if (el.innerHTML == 2048) {
         el.style.backgroundColor = '#f7ba04';
         el.style.fontSize = '53px';
         el.style.color = '#f9f6f2';
      }
      
})
}

function checkBestScores() {
   bestScores = bestScores.sort((a, b) => b - a); 
   if (bestScores[9] < score) {
      bestScores[9] = score;
   }
   bestScores = bestScores.sort((a, b) => b - a); 
   setTimeout(() => {
      localStorage.setItem('bestScores', JSON.stringify(bestScores));
   }, 0);
}

function showEnd() {
   gridEnd.style.opacity = 1;
   retryBtn.style.display = 'inline-block';
}

function checkGameOver() {
   let zeros = 0;
   for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
         zeros++;
      }
   }
   if (zeros === 0 && isGameOver === false) {
      setTimeout(() => {
         gridMessage.innerHTML = 'Game over!';
         scoreEnd.innerHTML = `Your final score: ${score}`;
         showEnd();
         playingEnd();
         localStorage.setItem('bestScores', JSON.stringify(bestScores));
         checkBestScores();
         rewriteBestScores();
      }, 0)
      isGameOver = true;
   }
}

function removeBestScores() {
   scoreList.innerHTML = '';
}

async function rewriteBestScores() {
   await removeBestScores();
   await createBestScores();
}

function checkWin() {
   for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
         showEnd();
         gridMessage.innerHTML = 'You win!';
         playingEnd();
      }
   }
   scoreEnd.innerHTML = `Your final score: ${score}`;
}

function generate() {
   randomValue = Math.random();
   randomNumber = Math.floor(Math.random() * squares.length);
   if (squares[randomNumber].innerHTML == 0) {
      if (randomValue < 0.7) {
         squares[randomNumber].innerHTML = 2;
      } else if (randomValue >= 0.7) {
         squares[randomNumber].innerHTML = 4;
      }
   } else generate();
   checkGameOver();
   checkSquareValue();
}

function createBoard() {
   for (let i = 0; i < width * width; i++) {
      square = document.createElement('div');
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
   }
   uploadingBestResults();
   createBestScores();
   generate();
   generate();
}

function moveRight() {
   for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
         firstValue = squares[i].innerHTML;
         secondValue = squares[i + 1].innerHTML;
         thirdValue = squares[i + 2].innerHTML;
         fourthValue = squares[i + 3].innerHTML;
         row = [parseInt(firstValue), parseInt(secondValue), parseInt(thirdValue), parseInt(fourthValue)];
         filteredRow = row.filter(num => num)
         zerosCount = 4 - filteredRow.length;
         zeroSquares = Array(zerosCount).fill(0);
         newRow = zeroSquares.concat(filteredRow);
         squares[i].innerHTML = newRow[0];
         squares[i + 1].innerHTML = newRow[1];
         squares[i + 2].innerHTML = newRow[2];
         squares[i + 3].innerHTML = newRow[3];
      }
   }
}

function moveLeft() {
   for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
         firstValue = squares[i].innerHTML;
         secondValue = squares[i + 1].innerHTML;
         thirdValue = squares[i + 2].innerHTML;
         fourthValue = squares[i + 3].innerHTML;
         row = [parseInt(firstValue), parseInt(secondValue), parseInt(thirdValue), parseInt(fourthValue)];
         filteredRow = row.filter(num => num)
         zerosCount = 4 - filteredRow.length;
         zeroSquares = Array(zerosCount).fill(0);
         newRow = filteredRow.concat(zeroSquares);
         squares[i].innerHTML = newRow[0];
         squares[i + 1].innerHTML = newRow[1];
         squares[i + 2].innerHTML = newRow[2];
         squares[i + 3].innerHTML = newRow[3];
      }
   }
}

function moveDown() {
   for (let i = 0; i < 4; i++) {
      firstValue = squares[i].innerHTML;
      secondValue = squares[i + width].innerHTML;
      thirdValue = squares[i + width * 2].innerHTML;
      fourthValue = squares[i + width * 3].innerHTML;
      column = [parseInt(firstValue), parseInt(secondValue), parseInt(thirdValue), parseInt(fourthValue)];
      filteredColumn = column.filter(num => num);
      zerosCount = 4 - filteredColumn.length;
      zeroSquares= Array(zerosCount).fill(0);
      newColumn =  zeroSquares.concat(filteredColumn);
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
   }
}

function moveUp() {
   for (let i = 0; i < 4; i++) {
      firstValue = squares[i].innerHTML;
      secondValue = squares[i + width].innerHTML;
      thirdValue = squares[i + width * 2].innerHTML;
      fourthValue = squares[i + width * 3].innerHTML;
      column = [parseInt(firstValue), parseInt(secondValue), parseInt(thirdValue), parseInt(fourthValue)];
      filteredColumn = column.filter(num => num);
      zerosCount = 4 - filteredColumn.length;
      zeroSquares= Array(zerosCount).fill(0);
      newColumn =  filteredColumn.concat(zeroSquares);
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
   }
}

function sumRow() {
   for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
         sumOfSqures = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
         squares[i + 1].innerHTML = sumOfSqures;
         squares[i].innerHTML = 0;
         score += sumOfSqures;
         scoreDisplay.innerHTML = score;
      }
   }
   checkWin();
   playingClick();
}

function sumColumn() {
   for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
         sumOfSqures = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
         squares[i].innerHTML = sumOfSqures;
         squares[i + width].innerHTML = 0;
         score += sumOfSqures;
         scoreDisplay.innerHTML = score;
      }
   }
   checkWin();
   playingClick();
}

function playingClick () {
   audioClick.currentTime = 0;
   audioClick.play();
}

function playingEnd() {
   audioEnd.currentTime = 0;
   audioEnd.play();
}

function control(e) {
   if (e.keyCode === 39) {
      keyRight();
   } else if (e.keyCode === 37) {
      keyLeft();
   } else if (e.keyCode === 38) {
      keyUp();
   } else if (e.keyCode === 40) {
      keyDown();
   }
   
}

function keyRight() {
   if (!isGameOver) {
      moveRight();
      sumRow();
      moveRight();
      generate();
   }
}

function keyLeft() {
   if (!isGameOver) {
      moveLeft();
      sumRow();
      moveLeft();
      generate();
   }
}

function keyDown() {
   if (!isGameOver) {
      moveDown();
      sumColumn();
      moveDown();
      generate();
   }
}

function keyUp() {
   if (!isGameOver) {
      moveUp();
      sumColumn();
      moveUp();
      generate();
   }
}

function newGame() {
   hiddenEnd();
   scoreDisplay.innerHTML = 0;
   score = 0;
   squares.forEach(el => el.innerHTML = 0);
   checkSquareValue();
   generate();
   generate();
   audioEnd.currentTime = 0;
   audioEnd.pause();
   isGameOver = false;
}

function hiddenEnd() {
   gridEnd.style.opacity = 0;
   retryBtn.style.display = 'none';
}

createBoard();

retryBtn.addEventListener('click', newGame);

document.addEventListener('keydown', control);

newGameBtn.addEventListener('click', newGame);

cupIcon.addEventListener('click', () => {
   scoreListContainer.classList.toggle('active');
})