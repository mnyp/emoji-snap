// define players
var user = {
	name: 'user',
	roundsWon: 0,
	currentEmoji: undefined
};

var pc = {
	name: 'pc',
	roundsWon: 0,
	currentEmoji: undefined
};

// define our emojis
var emojis = ['😚','😁','🔫','🍰','🐶','🐱'];
var kisser = '😚';

// define state
var currentRound = 0;

var startNextRound = function () {
	// pc and user to be assigned a random emoji each
	// increment round (round +1)
	currentRound ++;
	user.currentEmoji = getRandomEmoji();
	pc.currentEmoji = getRandomEmoji();

	console.log('emojis', pc.currentEmoji, 'vs', user.currentEmoji);
};

var getRandomEmoji = function () {
	var randomNumber = Math.round(Math.random() * (emojis.length - 1));
	var randomEmoji = emojis[randomNumber];

	return randomEmoji;
};