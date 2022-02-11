// Assignment Code
var generateBtn = document.querySelector("#generate");

// "\\" is an escape character, functions funny in js

//arrays with available character options
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialCharacters = [
	"@",
	"%",
	"+",
	"/",
	"'",
	"!",
	"#",
	"$",
	"^",
	"?",
	":",
	",",
	")",
	"(",
	"}",
	"{",
	"]",
	"[",
	"~",
	"-",
	"_",
	".",
];
var lowerCase = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];
var upperCase = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"R",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

// Write password to the #password input
//write function to grab user input using prompts and confirms
//add conditionals to set limits on how long password can be
//store the user's input in an object we can reference later
function getUserInput() {
	var passwordLength = prompt(
		"How long should your password be? Please pick between 8 and 128 characters"
	);
	//if less than 8 characters,
	if (passwordLength < 8) {
		//alert will display
		alert("Password length must be at least 8 characters");
		return;
	}
	//if more than 128 characters
	if (passwordLength > 128) {
		//alert will display
		alert("Password length must be no more than 128 characters");
		return;
	}
	//asks if lowercase letters should be included in var characterpool. if "ok", boolean is true
	var confirmLowercase = confirm(
		"do you want your password to have lowercase characters?"
	);
	//asks if uppercase letters should be included in var characterpool. if "ok", boolean is true
	var confirmUppercase = confirm(
		"do you want your password to have uppercase characters?"
	);
	//asks if special characters should be included in var characterpool. if "ok", boolean is true
	var confirmSpecial = confirm(
		"do you want your password to have special characters?"
	);
	//asks if numbers should be included in var characterpool. if "ok", boolean is true
	var confirmNumber = confirm(
		"do you want your password to have numeric characters?"
	);
	//sets resulting boolean value as a value in another object for reference
	var userChoice = {
		// object = {key:value}
		userPwLength: passwordLength,
		userLowercase: confirmLowercase,
		userUppercase: confirmUppercase,
		userSpecial: confirmSpecial,
		userNumber: confirmNumber,
	};
	//returns the resulting object to global scope for use in generatePassword function
	return userChoice;
}
//function to randomize an array, to be used in generatePassword funtion, randomizing characterPool array
function randomizeArray(array) {
	var index = Math.floor(Math.random() * array.length);
	var indexValue = array[index];
	return indexValue;
}
//function that generates the password, returning the final password to global scope
function generatePassword() {
	//sets userPrompt var in generatePassword as getUserInput function from above
	var userPrompt = getUserInput();
	//the final password
	var finalPassword = [];
	//the array that holds all available characters for 
	var characterPool = [];
	if (userPrompt.userLowercase === true) {
		characterPool = characterPool.concat(lowerCase);
		characterPool.push(randomizeArray(lowerCase));
	}
	if (userPrompt.userNumber === true) {
		characterPool = characterPool.concat(numericCharacters);
		characterPool.push(randomizeArray(numericCharacters));
	}
	if (userPrompt.userUppercase === true) {
		characterPool = characterPool.concat(upperCase);
		characterPool.push(randomizeArray(upperCase));
	}
	if (userPrompt.userSpecial === true) {
		characterPool = characterPool.concat(specialCharacters);
		characterPool.push(randomizeArray(specialCharacters));
	}
	if (!characterPool.length) {
		alert(
			"You must choose at least one type of character to generate a password"
		);
	}

	for (var i = 0; i < userPrompt.userPwLength; i++) {
		var stagedArray = randomizeArray(characterPool);
		finalPassword.push(stagedArray);
	}
	//returns object to global scope for 
	return finalPassword.join("");
}

//input> randomizer>generate password
function writePassword() {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");

	passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
