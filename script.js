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

var snap = function (pcCalledSnap) {
	// compare between the 2 emojis
	// if it's a kisser then snap is true
	// if snap is true then the user/pc getins +1 to roundsWon
	// if user gets it wrong then pc gets +1 to roundsWon
	// notify of what just happened - console/ui/html

	// check for undefined emojis
	if (pc.currentEmoji == undefined || user.currentEmoji == undefined) {
		return false;
	}

	var snap = user.currentEmoji == pc.currentEmoji;

	if (user.currentEmoji == kisser || pc.currentEmoji == kisser) {
		snap = true;
	}

	console.group('Snap called by: ' + (pcCalledSnap ? 'PC' : 'User'));

// pc called
	if (pcCalledSnap) {
		if (snap) {
			pc.roundsWon ++;
			console.log('pc won the round');
		} else {
			user.roundsWon ++;
			console.log('pc lost the round');
		}

// user called
	} else {
		if (snap) {
			user.roundsWon ++;
			console.log('user won the round');
		} else {
			pc.roundsWon ++;
			console.log('user lost the round');
		}
	}

	user.currentEmoji = undefined;
	pc.currentEmoji = undefined;

	console.groupEnd();
};