// settings
var roundsToWin = 3;
var countdownFrom = 5;
var newRoundStartsIn = 6000;
var newRoundStartsInFromSnap= 4000;
var pcCallsIn = 2000;
var countdownSpeed = 500;

// timers
var newRoundTimer = undefined;
var pcCallSnapTimer = undefined;
var countdownTimer = undefined;

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
var emojis = ['🃏','😁','🔫','🍰','🐶','🐱'];
var joker = '🃏';

// define state
var currentRound = 0;
var count = countdownFrom;

var start = function() {
	countdown();
};

var countdown = function () {
	if (count != 0) {
		console.clear();
		console.log('count: ', count);
	}

	if (count <= 0) {
		count = countdownFrom;
		startNextRound();
		return;
	} else {
		countdownTimer = setTimeout(countdown, countdownSpeed);
	}
	count --;
};

var startNextRound = function () {
	// pc and user to be assigned a random emoji each
	// increment round (round +1)
	currentRound ++;

	console.log('Round', currentRound);

	// Set user emojis
	user.currentEmoji = getRandomEmoji();
	pc.currentEmoji = getRandomEmoji();

	// pc calls snap
	if (isAMatch()) {
		pcCallSnapTimer = setTimeout(function () {
			snap(true);
		}, pcCallsIn);
	}

	newRoundTimer = setTimeout(countdown, newRoundStartsIn);

	console.log('emojis', pc.currentEmoji, 'vs', user.currentEmoji);
};

var isAMatch = function () {
	if (user.currentEmoji == joker || pc.currentEmoji == joker) {
		return true;
	}
	return pc.currentEmoji == user.currentEmoji;
}

var getRandomEmoji = function () {
	var randomNumber = Math.round(Math.random() * (emojis.length - 1));
	var randomEmoji = emojis[randomNumber];

	return randomEmoji;
};

var snap = function (pcCalledSnap) {
	// compare between the 2 emojis
	// if it's a joker then snap is true
	// if snap is true then the user/pc getins +1 to roundsWon
	// if user gets it wrong then pc gets +1 to roundsWon
	// notify of what just happened - console/ui/html

	// check for undefined emojis
	if (pc.currentEmoji == undefined || user.currentEmoji == undefined) {
		return false;
	}

	clearTimeout(newRoundTimer);

	var snap = isAMatch();

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

	console.log('User: ', user.roundsWon, 'PC: ', pc.roundsWon);

	user.currentEmoji = undefined;
	pc.currentEmoji = undefined;

	if (user.roundsWon == roundsToWin) {
		console.log('user won the game!!');
		console.log('game over');
	} else if (pc.roundsWon == roundsToWin) {
		console.log('pc won the game!!');
		console.log('game over');
	} else {
		newRoundTimer = setTimeout(countdown, newRoundStartsInFromSnap);
	}

	console.groupEnd();
};