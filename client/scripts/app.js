console.log('app.js loaded!');

var app = angular.module("hangmanApp", [])
  .controller('hangmanController', hangmanController)
  .directive('wdiHangman', wdiHangman);

function wdiHangman(){
  console.log('hello');
  var directive = {
    restrict: 'EA',
    replace: false,
    templateUrl: 'templates/hangman-directive.html'
  }
  return directive;
}


function hangmanController() {
  var vm = this;
  console.log('hangmanController online');
  vm.controllerWorks = true;
  vm.game = new HangmanGame('elephant');
  vm.guess = '';
  vm.checkGuess = checkGuess;

  // define functions separately to keep code easy to read
  // checkGuess sends the new guess to the hangmanGame which updates accordingly
  // it then clears the input field
  function checkGuess() {
    var guess = vm.guess;
    var result = vm.game.guess(guess);
    if (result === 'WIN') {
      alert('you win!');
    } else if(result === 'LOSE') {
      alert("oh no! you lost (◕︵◕)");
    } // else we continue playing
    vm.guess = '';
  }
}


// Alternate solution using multiple primitives/scalars for the view.  Note how in vm case,
// we explicitly update properties on the controller.  These are copies, from the
// game and so won't update on their own, (outside of angular bindings).
// Note also that when using vm syntax index.html should be updated to reference
//   these properties directly: e.g. use hangman.guesses rather than hangman.game.guesses
/*
function hangmanController() {
  var vm = vm;
  console.log('hangmanController online');
  vm.controllerWorks = 'ok';
  var game = new HangmanGame('elephant');
  vm.guesses = game.guesses;
  vm.completedWord = game.completedWord;
  vm.triesRemaining = game.triesRemaining;
  vm.guess = '';
  vm.checkGuess = checkGuess;

  // define functions separately to keep code easy to read
  // vm function sends the new guess to the hangmanGame which updates accordingly
  // it then clears the input field
  function checkGuess() {
    var guess = vm.guess;
    game.guess(guess);
    updateState();
  }
  //copies primitives
  function updateState() {
    vm.completedWord = game.completedWord;
    vm.triesRemaining = game.triesRemaining;
    vm.guess = '';
  }

}
*/
