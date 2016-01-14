var words = []
words["Cities"] = [ "Amsterdam", "London", "Moscow", "Buenos Aires", "Singapore" ]
words["TV Shows"] = [ "Silicon Valley", "Breaking Bad", "Californication", "House of Cards", "Sherlock"]
words["Art"] = ["Mona Lisa", "Lady with an Ermine", "The Persistence of Memory", "Primavera", "The Last Supper"]
words["Films"] = ["Interstellar", "Intouchables", "The Green Mile", "Pulp Fiction", "Django Unchained"]
words["Music"] = ["Requiem", "Barracuda", "Imagine", "Happy Birthday", "Imperial March"]

var currentWord = ""
var visibleWord = ""
var guesses = 5

function isVowel(character) {
	return character == 'A' || character == 'E' || character == 'I' || character == 'O' || character == 'U' || character == 'Y'
}

//Our replaceAt, because we can't just modify string like that
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function generatePlaceholder(wordDisplay) {
	//Space - real space between words
	//Dot - invisible character
	var placeholders = ""

	for (i = 0; i < wordDisplay.length; i++) {
		if(wordDisplay[i] != ' ')
		{
			if(wordDisplay[i] == '.') {
				placeholders += "_ "
			}
			else {
				placeholders += wordDisplay[i] + " "
			}
		}
		else
		{
			placeholders += '&nbsp' + '&nbsp'
		}
	}
	return placeholders
}

$(document).ready(function () {
	$("button.key").click(function() {
		var key = $(this).html()
		 $(this).attr("disabled", true);

		//Check if player hit
		var hit = false
		for(i = 0; i < currentWord.length; i++)
		{
			if(key == currentWord[i] && currentWord[i] != visibleWord[i]) {
				hit = true
				visibleWord = visibleWord.replaceAt(i,currentWord[i])
			}
		}

		//Player missed!
		if(!hit) {
			if(visibleWord.valueOf() != currentWord.valueOf())
			{
				guesses--
				if(guesses <= 0)
				{
					$("#guesses").html("The man is hunged")
					visibleWord = currentWord
				}
				else {
					$("#guesses").html("Guesses left: " + guesses)
				}
			}
		}
		else
		{
			if(visibleWord.valueOf() == currentWord.valueOf())
			{
				$("#guesses").html("The man survived!")
			}
		}

		$("#letters").html(generatePlaceholder(visibleWord))
	});

	$("#newword").click(function() {
		var category = $("#categoryselect").val()

		//Update guesses
		guesses = 5
		$("#guesses").html("Guesses left: " + guesses)

		//Restart keyboard
		$(".key").attr("disabled", false);

		//Get random word and make it upper letters
		var word = words[category][Math.floor((Math.random() * 5))]
		word = word.toUpperCase();

		//Set current word
		currentWord = word

		//Clear visible word
		visibleWord = ""
		for(i = 0; i < word.length; i++) {
			if(word[i] == ' ') {
				visibleWord += ' '
			}
			else {
				if (isVowel(word[i])) {
					visibleWord += word[i]
				}
				else {
					visibleWord += '.'
				}
			}
		}

		//Generate placeholder
		var placeholders = generatePlaceholder(visibleWord)

		//Set to displays
		$("#letters").html(placeholders)

		//Adjust size
		if(placeholders.length > 50){
			$("#letters").css("font-size","30px")
		}
		else if(placeholders.length >= 29) {
			$("#letters").css("font-size","40px")
		}
		else if(placeholders.length > 16) {
			$("#letters").css("font-size","50px")
		}
		else {
			$("#letters").css("font-size","60px")
		}
	});

	$("#newword").click()
});