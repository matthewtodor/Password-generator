// Assignment Code
var generateBtn = document.querySelector("#generate");

// "\\" is an escape character, functions funny in js

//add arrays with available character options
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
	if (passwordLength < 8) {
		alert("Password length must be at least 8 characters");
		return;
	}
	if (passwordLength > 128) {
		alert("Password length must be no more than 128 characters");
		return;
	}
	var confirmLowercase = confirm(
		"do you want your password to have lowercase characters?"
	);
	var confirmUppercase = confirm(
		"do you want your password to have uppercase characters?"
	);
	var confirmSpecial = confirm(
		"do you want your password to have special characters?"
	);
	var confirmNumber = confirm(
		"do you want your password to have numeric characters?"
	);
	var userChoice = {
		// object = {key:value}
		userPwLength: passwordLength,
		userLowercase: confirmLowercase,
		userUppercase: confirmUppercase,
		userSpecial: confirmSpecial,
		userNumber: confirmNumber,
	};

	return userChoice;
}
function randomizeArray(array) {
	var index = Math.floor(Math.random() * array.length);
	var indexValue = array[index];
	return indexValue;
}
function generatePassword() {
	var userPrompt = getUserInput();
	var finalPassword = [];
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
