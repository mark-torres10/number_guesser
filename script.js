/*
Generate a random number 1-100, for a person to guess
*/

function generateValue() {
  let randomFloat = Math.random() * 100;
  let randomInt = Math.floor(randomFloat);
  return randomInt;
}

randomInt = generateValue();
console.log(`Our random number is: ${randomInt}`);

/* 
Get user value from input and save it to variable
*/

let isCorrect = false;

let submitNumberAndCompare = () => {
  // get guess
  guess = parseInt(document.getElementById("number-guess").value);

  document.getElementById("number-guess").value = "";

  console.log(guess);

  if (Number.isNaN(guess)) {
    isCorrect = false;
  }

  // compare to random numbe
  if (guess === randomInt) {
    isCorrect = true;
  } else {
    isCorrect = false;
  }
};

let rightAnswers = ["Got it right!", "Great job!", "Nailed it!"];
let wrongAnswers = ["Not quite!", "Good try!", "Try Again!"];

let isEqual = () => {
  // remove existing popup element
  let popup = document.querySelector(".new-popup");
  if (popup) {
    console.log("removing element!");
    popup.remove();
  }

  // Create a new popup element
  let newPopup = document.createElement("DIV");
  newPopup.setAttribute("class", "new-popup");

  // update responses, based on if answer is right or wrong
  let idx;
  let color = "";
  if (isCorrect) {
    idx = Math.floor(Math.random() * rightAnswers.length);
    color = "green";
  } else {
    idx = Math.floor(Math.random() * wrongAnswers.length);
    color = "red";
  }

  newPopup.innerHTML = possibleValues[idx];

  alert(`Are the two guesses equal? ${isCorrect}`);

  // insert after guess text box
  let guessDiv = document.getElementById("guess-container");
  guessDiv.parentNode.insertBefore(newPopup, guessDiv.nextSibling);
  console.log(document.getElementsByClassName("new-popup"));
  console.log(document.getElementsByClassName("new-popup")[0].style.backgroundColor);

  // update element color based on answer
  document.getElementsByClassName("new-popup")[0].style.backgroundColor = color;
};

document.getElementById("button-submit").addEventListener("click", submitNumberAndCompare);
document.getElementById("button-submit").addEventListener("click", isEqual);

/*
Compare the user's guess to the generated number
*/

let compare = (guess, actual) => {};
/*
Display the result ("Guess again" if you're off, "Congrats!" if you're right)
*/

/* 
Wrapper function to play the game
*/

let playGame = () => {
  console.log("Play me!");
};
