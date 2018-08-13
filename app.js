const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const resetBtn = document.querySelector('.btn__reset');
const scoreBoard = document.getElementById('scoreboard');
let missed = 0;
const phrases = [
  'Better safe than sorry',
  'A piece of cake',
  'I wish you all the best',
  'This is a random phrase',
  'Be strong and courageous'
]

function getRandomPhraseArray(array) {
  const random = Math.floor((Math.random() * array.length));
  return array[random].split("");
}

function addPhraseToDisplay() {
  const selectedPhrase = getRandomPhraseArray(phrases);

  for (let i = 0; i < selectedPhrase.length; i++) {
    const char = selectedPhrase[i];
    const li = document.createElement('li');
    li.textContent = char;
    if (char != " ") {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    phrase.querySelector('ul').appendChild(li);
  }
}

function checkLetter(letter) {
  const lettersLi = document.getElementsByClassName('letter');
  const letterUp = letter.toUpperCase();
  let hit = false;
  for (let i = 0; i < lettersLi.length; i++) {
    const charUp = lettersLi[i].textContent.toUpperCase();
    if (charUp === letterUp) {
      lettersLi[i].classList.add('show');
      hit = true;
    }
  }
  if (hit) {
    return letter;
  } else {
    return null
  }
}

function checkWin() {
  let lettersLi = phrase.getElementsByClassName('letter');
  let hitLettersLi = phrase.getElementsByClassName('show')
  if (hitLettersLi.length === lettersLi.length) {
    overlay.className = 'win';
    overlay.firstElementChild.textContent = 'You Win!';
    overlay.lastElementChild.textContent = 'Play Again';
    overlay.style.display = '';
  }
}

function cleanGame() {
  const chosen = qwerty.getElementsByClassName('chosen');
  const hiddenTries = scoreBoard.getElementsByClassName('hide');

  while (chosen.length > 0) {
    chosen[0].disabled = false;
    chosen[0].className = '';
  }

  while (hiddenTries.length > 0) {
    hiddenTries[0].className = '';
  }

  phrase.firstElementChild.innerHTML = '';

  missed = 0;
}



qwerty.addEventListener('click', function(e) {
  const target = e.target
  if (target.tagName === 'BUTTON') {
    target.className = 'chosen';
    target.disabled = true;
    const letterFound = checkLetter(target.textContent);
    if (letterFound === null) {
      missed++;
      const triesLi = scoreBoard.getElementsByClassName('tries');
      const trieLiLost = triesLi[triesLi.length - (missed)];
      trieLiLost.firstElementChild.className = 'hide';
      if (missed === 5) {
        overlay.className = 'lose';
        overlay.firstElementChild.textContent = 'You Lose!';
        overlay.lastElementChild.textContent = 'Try Again';
        overlay.style.display = '';
      }
    } else {
      checkWin();
    }

  }
});

resetBtn.addEventListener('click', function() {
  cleanGame()
  addPhraseToDisplay();
  overlay.style.display = 'none';
});
