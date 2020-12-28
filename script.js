/*
 */

/* 
Get user value from input and save it to variable
*/

/*
Generate a random number 1-100, for a person to guess
*/

/*
Compare the user's guess to the generated number
*/

let generateValue = () => {
  let randomFloat = Math.random() * 100;
  let randomInt = Math.floor(randomFloat);
  return randomInt;
};

randomNumber = generateValue();
console.log(`Our random number is: ${randomNumber}`);

/*
Display the result ("Guess again" if you're off, "Congrats!" if you're right)
*/

/* 
Wrapper function to play the game
*/

let playGame = () => {
  console.log("Play me!");
};
