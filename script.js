/*

TODO: ADD optimal strategy implementation (maybe demonstration of binary search? A diagram? Demoing it?)
TODO: Add screen that tracks your guesses
TODO: Maybe add a visualization of how many guesses it took you to get to the right number? Then, visualize with d3.js?

*/

/*
Generate a random number 1-100, for a person to guess
*/

function generateValue(range = 100) {
  let randomFloat = Math.random() * range;
  let randomInt = Math.floor(randomFloat);
  return randomInt;
}

randomInt = generateValue();

/* Evaluate user input */

let isCorrect = false;
let isTooLow;

/* Get user guess, compare to actual number */
let submitNumberAndCompare = () => {
  // get guess
  guess = parseInt(document.getElementById("number-guess").value);

  document.getElementById("number-guess").value = "";

  if (Number.isNaN(guess)) {
    isCorrect = false;
  }

  // compare to randomly generated number
  if (guess === randomInt) {
    isCorrect = true;
  } else {
    isCorrect = false;
    if (guess < randomInt) {
      isTooLow = true;
    } else {
      isTooLow = false;
    }
  }
};

/* Generate response based on comparing guess to actual */
let rightAnswers = ["Got it right!", "Great job!", "Nailed it!"];
let wrongAnswers = ["Not quite!", "Good try!", "Try Again!"];

let isEqual = () => {
  // remove existing popup element
  let popup = document.querySelector(".new-popup");
  if (popup) {
    popup.remove();
  }
  let newStrategy = document.querySelector("#button-strategy");
  if (newStrategy) {
    newStrategy.remove();
  }
  // Create a new popup element
  let newPopup = document.createElement("DIV");
  newPopup.setAttribute("class", "new-popup");

  // update responses, based on if answer is right or wrong
  let idx;
  let color = "";
  if (isCorrect) {
    idx = Math.floor(Math.random() * rightAnswers.length);
    newPopup.innerHTML = rightAnswers[idx];
    color = "green";
  } else {
    // update message
    idx = Math.floor(Math.random() * wrongAnswers.length);
    newPopup.innerHTML = wrongAnswers[idx];
    color = "red";
    if (isTooLow) {
      newPopup.innerHTML = newPopup.innerHTML + " Your guess was too low";
    } else {
      newPopup.innerHTML = newPopup.innerHTML + " Your guess was too high";
    }
    // add optimal strategy button
    let newButton = document.createElement("BUTTON");
    newButton.setAttribute("id", "button-strategy");
    newButton.innerHTML = "Help! What's the optimal strategy?";
    let restartButton = document.getElementById("button-restart");
    restartButton.parentNode.insertBefore(newButton, restartButton.nextSibling);
  }

  alert(`Are the two guesses equal? ${isCorrect}`);

  // insert after guess text box
  let guessDiv = document.getElementById("guess-container");
  guessDiv.parentNode.insertBefore(newPopup, guessDiv.nextSibling);
  console.log(document.getElementsByClassName("new-popup"));
  console.log(document.getElementsByClassName("new-popup")[0].style.backgroundColor);

  // update element color based on answer
  document.getElementsByClassName("new-popup")[0].style.backgroundColor = color;
};

let resetRandomNumber = () => {
  randomInt = generateValue();

  // remove any popup divs
  let popup = document.querySelector(".new-popup");
  if (popup) {
    console.log("removing element!");
    popup.remove();
  }
};

/* 
update table with guesses 
*/

let updateTableCounter = () => {
  // add new table row
  let newRow = document.createElement("TR");
  newRow.setAttribute("class", "counter-table-row");

  // add new guess, count as child elements
  let newGuess = document.createElement("TD");
  newGuess.setAttribute("class", "counter-table-guess");
  let newCount = document.createElement("TD");
  newCount.setAttribute("class", "counter-table-count");

  newGuess.innerHTML = guess;

  // see if there are pre-existing rows
  let latestRow = document.getElementsByClassName("counter-table-row");

  if (latestRow.length === 0) {
    console.log("No pre-existing rows!");
    newCount.innerHTML = "1";
  } else {
    console.log("We do get a value for latestRow");
    console.log(latestRow);
    console.log(latestRow.length);
    newCount.innerHTML = "9999";
  }

  // add to existing DOM
  newRow.appendChild(newGuess);
  newGuess.parentNode.insertBefore(newCount, newGuess.nextSibling);
  let counterTable = document.getElementById("past-guesses-table");
  counterTable.appendChild(newRow);
};

let resetTableCounter = () => {
  let elements = document.getElementsByClassName("counter-table-row");
  let idx = 5;
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

/* 
update counter 
*/
let increaseGuessCounter = () => {
  const NUM_REGEX = /\d+/g;
  let counterString = document.getElementById("past-guesses-counter").innerHTML;
  let currentCounter = parseInt(counterString.match(NUM_REGEX));
  let newCounter = currentCounter + 1;
  document.getElementById(
    "past-guesses-counter",
  ).innerHTML = `Number of past guesses: ${newCounter}`;
};

let resetGuessCounter = () => {
  document.getElementById("past-guesses-counter").innerHTML = `Number of past guesses: 0`;
};

/* When user clicks "Check my Answer!" */
document.getElementById("button-submit").addEventListener("click", submitNumberAndCompare);
document.getElementById("button-submit").addEventListener("click", isEqual);
document.getElementById("button-submit").addEventListener("click", increaseGuessCounter);
document.getElementById("button-submit").addEventListener("click", updateTableCounter);

/* When user clicks "Restart"*/
document.getElementById("button-restart").addEventListener("click", resetRandomNumber);
document.getElementById("button-restart").addEventListener("click", resetGuessCounter);
document.getElementById("button-restart").addEventListener("click", resetTableCounter);
