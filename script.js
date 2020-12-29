/*

TODO: ADD optimal strategy implementation (maybe demonstration of binary search? A diagram? Demoing it?)
TODO: Add screen that tracks your guesses
TODO: Maybe add a visualization of how many guesses it took you to get to the right number? Then, visualize with d3.js?

*/

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#left-box")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear().domain([0, 10]).range([height, 0]);
//svg.append("g").call(d3.axisLeft(y));

// add baseline
svg
  .append("line") // attach a line
  .style("stroke", "black") // colour the line
  .attr("x1", 0) // x position of the first end of the line
  .attr("y1", 200) // y position of the first end of the line
  .attr("x2", width) // x position of the second end of the line
  .attr("y2", 200); // y position of the second end of the line

// add new lines
let correction = width / 100;
let min = 10;
let max = 90;

// add left, right boundaries
svg
  .append("line") // attach a line
  .style("stroke", "red") // colour the line
  .attr("x1", correction * min) // x position of the first end of the line
  .attr("y1", 100) // y position of the first end of the line
  .attr("x2", correction * min) // x position of the second end of the line
  .attr("y2", 400); // y position of the second end of the line

svg
  .append("line") // attach a line
  .style("stroke", "red") // colour the line
  .attr("x1", correction * max) // x position of the first end of the line
  .attr("y1", 100) // y position of the first end of the line
  .attr("x2", correction * max) // x position of the second end of the line
  .attr("y2", 400); // y position of the second end of the line

// add line for ideal next guess
let midpointX = (correction * max + correction * min) / 2;
svg
  .append("line") // attach a line
  .style("stroke", "green") // colour the line
  .attr("x1", midpointX) // x position of the first end of the line
  .attr("y1", 100) // y position of the first end of the line
  .attr("x2", midpointX) // x position of the second end of the line
  .attr("y2", 400); // y position of the second end of the line

// color in rectangular area corresponding to possible range for the numbers
let rect = d3.area().x0(0).x1(400).y0(0).y1(400);

svg.append("path").attr("d", rect).attr("fill", "green");

/*
// Show confidence interval
svg
  .append("path")
  .datum(data)
  .attr("fill", "#cce5df")
  .attr("stroke", "none")
  .attr(
    "d",
    d3
      .area()
      .x(function (d) {
        return x(d.x);
      })
      .y0(function (d) {
        return y(d.CI_right);
      })
      .y1(function (d) {
        return y(d.CI_left);
      }),
  );

// Add the line
svg
  .append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr(
    "d",
    d3
      .line()
      .x(function (d) {
        return x(d.x);
      })
      .y(function (d) {
        return y(d.y);
      }),
  );
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

/* initialize values */

let guess;
let guessArray = [];
let isCorrect = false;
let isTooLow;
let numberPastAttempts = 0;
let minRange = 0;
let maxRange = 100;

/* Get user guess, compare to actual number */
let submitNumberAndCompare = () => {
  // get guess
  guess = parseInt(document.getElementById("number-guess").value);
  guessArray.push(guess);

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

  // add new guess, count as child elements.
  let newGuess = document.createElement("TD");
  newGuess.setAttribute("class", "counter-table-guess");
  let newCount = document.createElement("TD");
  newCount.setAttribute("class", "counter-table-count");

  color = "";
  opacity_val = 0.95;
  if (isCorrect) {
    color = "green";
  } else {
    color = "red";
  }

  newGuess.innerHTML = guess;
  newGuess.style.backgroundColor = color;
  newGuess.style.opacity = opacity_val;

  newCount.innerHTML = numberPastAttempts;
  newCount.style.backgroundColor = color;
  newCount.style.opacity = opacity_val;

  newRow.appendChild(newGuess);
  newGuess.parentNode.insertBefore(newCount, newGuess.nextSibling);
  // add to existing DOM
  let counterTable = document.getElementById("past-guesses-table");
  counterTable.appendChild(newRow);
};

let resetTableCounter = () => {
  let elements = document.getElementsByClassName("counter-table-row");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

/* 
update counter 
*/

let displayGuessCounter = () => {
  document.getElementById(
    "past-guesses-counter",
  ).innerHTML = `Number of past guesses: ${numberPastAttempts}`;
};

/*
update average guess
*/

let displayAverageGuess = () => {
  let totalGuesses = 0;
  for (let i = 0; i < guessArray.length; i++) {
    console.log(`The latest entry: ${guessArray[i]}`);
    totalGuesses += guessArray[i];
  }

  let average = Math.floor(totalGuesses / guessArray.length);
  document.getElementById("past-guesses-average").innerHTML = `Average of guesses: ${average}`;
};

/* When user clicks "Check my Answer!" */
document.getElementById("button-submit").addEventListener("click", function () {
  numberPastAttempts++;
});
document.getElementById("button-submit").addEventListener("click", submitNumberAndCompare);
document.getElementById("button-submit").addEventListener("click", isEqual);
document.getElementById("button-submit").addEventListener("click", displayGuessCounter);
document.getElementById("button-submit").addEventListener("click", updateTableCounter);
document.getElementById("button-submit").addEventListener("click", displayAverageGuess);

/* When user clicks "Restart"*/
document.getElementById("button-restart").addEventListener("click", function () {
  numberPastAttempts = 0;
});
document.getElementById("button-restart").addEventListener("click", resetRandomNumber);
document.getElementById("button-restart").addEventListener("click", displayGuessCounter);
document.getElementById("button-restart").addEventListener("click", resetTableCounter);
