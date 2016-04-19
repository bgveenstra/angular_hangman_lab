console.log('hangmanGame loaded');

// HangmanGame
// to use:
// 1. var hg = new HangmanGame('supersecretword');
// 2. hg.guess('t');
var HangmanGame = function(secretWord, tries) {
  this.secretWord = secretWord;
  this.guesses = [];
  this.triesRemaining = tries || 7;
  this.completedWord = this.wordSoFar();
};


// call hg.guess('f') to guess a letter and update the game status
HangmanGame.prototype.guess = function(newLetter) {
  console.log('received guess:', newLetter);
  if (this.isLetterInWord(newLetter, this.secretWord)) {
    console.log('found ' + newLetter + ' in the word: ', this.secretWord);
  } else {
    this.triesRemaining--;
  }
  // only add unique letters
  if (this.guesses.indexOf(newLetter) === -1) {
    this.guesses.push(newLetter);
  }
  this.completedWord = this.wordSoFar();
  return this.checkGameWinStatus();
};

// hg.wordSoFar() returns the word completed up till now,
//    with underscores for missing letters
//    'example' after guessing 'e', 'a', 'l': 'e_a__le'
HangmanGame.prototype.wordSoFar = function() {
  var newSecretWord = '';
  for (var index in this.secretWord) {
    var currentLetter = this.secretWord[index];
    if(this.guesses.indexOf(currentLetter) > -1) {
      newSecretWord += currentLetter;
    } else {
      newSecretWord += '_';
    }
  }
  this.completedWord = newSecretWord;
  return newSecretWord;
};

// hg.checkGameWinStatus() determines win/lose/continue
//  returns 'LOSE' if player has lost,
//  returns 'WIN' if player has won,
//  returns 'CONTINUE' if play is ongoing
HangmanGame.prototype.checkGameWinStatus = function() {
  if(this.triesRemaining === 0) {
    return 'LOSE';
  } else if( !this.isLetterInWord('_', this.completedWord) ) {
    return 'WIN';
  } else {
    return 'CONTINUE';
  }
};

// hg.isLetterInWord('i', 'example')
// returns true if the letter is in the word, false if not
HangmanGame.prototype.isLetterInWord = function(letter, word) {
  return ((word.split('').indexOf(letter) > -1) ? (true) : (false));
};
