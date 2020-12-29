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

let possibleValues = ["Great!", "Good try!", "That's the spirit!"];

// add rightAnswer, wrongAnswer text

let isEqual = () => {
  // create popup that tells them if they're right or wrong
  let popup = document.querySelector(".new-button");
  let guessDiv = document.getElementById("guess-container");
  if (popup) {
    console.log("removing element!");
    popup.remove();
  }

  let newPopup = document.createElement("DIV"); // Create a new popup element
  newPopup.innerHTML = possibleValues[Math.floor(Math.random() * possibleValues.length)];
  newPopup.setAttribute("class", "new-popup");
  let color = "";
  if (isCorrect) {
    color = "green";
  } else {
    color = "red";
  }

  alert(`Are the two guesses equal? ${isCorrect}`);
  guessDiv.parentNode.insertBefore(newPopup, guessDiv.nextSibling);
  console.log(document.getElementsByClassName("new-popup"));
  console.log(document.getElementsByClassName("new-popup")[0].style.color);
  //document.getElementsByClassName("new-popup").style.color = "yellow";
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
