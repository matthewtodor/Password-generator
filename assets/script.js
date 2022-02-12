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
	//the array that holds all available characters for the password
	var characterPool = [];
	// IF the user chose to include lowercase letters...
	if (userPrompt.userLowercase === true) {
		// combine lowercase array into characterPool array using concat
		characterPool = characterPool.concat(lowerCase);
		//and randomize the array
		characterPool.push(randomizeArray(lowerCase));
	}
	// IF the user chose to include numbers...
	if (userPrompt.userNumber === true) {
		// combine the numbericCharacters array into the characterPool array using concat
		characterPool = characterPool.concat(numericCharacters);
		// and randomize the array
		characterPool.push(randomizeArray(numericCharacters));
	}
	// IF the user chose to include uppercase letters...
	if (userPrompt.userUppercase === true) {
		// combine the upperCase array into the characterPool array using concat
		characterPool = characterPool.concat(upperCase);
		//and randomize the array
		characterPool.push(randomizeArray(upperCase));
	}
	//IF the user chose to include special caracters...
	if (userPrompt.userSpecial === true) {
		//combine the specialCharacters array into the characterPool array using concat
		characterPool = characterPool.concat(specialCharacters);
		//and randomize the array
		characterPool.push(randomizeArray(specialCharacters));
	}
	//IF the user chose to not include ANY characters, the characterPool length is 0...
	if (!characterPool.length) {
		//And an alert will show
		alert(
			"You must choose at least one type of character to generate a password"
		);
	}
	//generates a character for each array element based on the length chosen by the user...
	for (var i = 0; i < userPrompt.userPwLength; i++) {
		//from the characterPool generated above..
		var stagedArray = randomizeArray(characterPool);
		//and pushes it into finalPassword array
		finalPassword.push(stagedArray);
	}
	//joines all array elements in finalPassword into a single element and RETURNS it to the global scope
	return finalPassword.join("");
}

//input> randomizer>generate password
//Function that is excecuted when button is clicked
function writePassword() {
	//runs the generatePassword function and sets the result to var password
	var password = generatePassword();
	//passwordText is displayed in #password id element
	var passwordText = document.querySelector("#password");
	//the value of var passwordText is password generated by generatePassword function
	passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
