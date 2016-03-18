
var tennis = require('../lib/tennis');

describe("Système de calcul du score au tennis", function() {
	
	it("Une partie est jouée entre exactement deux joueurs", function() {
		var game = tennis.game("Julien", "Marc");
		expect(game.players[0].name).toBe("Julien");
		expect(game.players[1].name).toBe("Marc");
	})
	
	it("Au début de la partie, le score est de 0-0", function() {
		newTestGame().forEachPlayer(function(player) {
			expect(player.score).toBe(0);
		})
	});
	
	it("Quand un joueur gagne la première balle, son score est de 15", function() {
		var game = newTestGame();
		game.playerWin(0);
		expect(game.players[0].score).toBe(15);
	})
	
	it("Quand un joueur gagne 4x d'affilé, le match est terminé et il est le gagnant", function() {
		var game = newTestGame();
		for (var i in fourTimes) game.playerWin(0);
		expect(game.winner).toBe(0);
	})
	
	it("Quand un joueur gagne 3 balles et son adversaire 4, le match n'est pas terminé, le score est 'Deuce'", function() {
		var game = initDeuceGame();
		expect(game.winner).not.toBe(true);
		game.forEachPlayer(function(player) { expect(player.score).toBe(40); });
	})
	
	it(".. Et le second second joueur a l'Avantage", function() {
		var game = initDeuceGame();
		expect(game.players[1].advantage).toBe(true);
		expect(game.players[0].advantage).toBe(false);
	})
	
	it("Quand un joueur qui a l'avantage marque un nouveau point, il gagne le match", function() {
		var game = initDeuceGame();
		game.playerWin(1);
		expect(game.winner).toBe(1);
	})
	
	it("Quand le joueur qui a l'avantage perd le point, le score revient à 'Deuce'", function() {
		var game = initDeuceGame();
		game.playerWin(0);
		expect(game.players[0].advantage).not.toBe.false;
		expect(game.winner).not.toBe.true;
	})
	
	it("Plusieur situations 'Deuce' peuvent s'enchainer sans que le match soit terminé", function() {
		var game = initDeuceGame();
		game.playerWin(0);
		game.playerWin(1);
		game.playerWin(1);
		expect(game.winner).toBe(1);
	})
	
	it("Il n'est pas possible de marquer de point une fois le match terminé", function() {
		var game = initDeuceGame();
		game.playerWin(1);
		expect(function(){
		  game.playerWin(1);
		}).toThrow("game ended");
	})
	
});

/**
 * Helper to init a new game and add tests methods
 */
function newTestGame() {
	var game = tennis.game();
	
	game.forEachPlayer = function(f) {
		game.players.forEach(function(player) {
			f(player);
		})
	}
	
	return game;
}

/**
 * Init a new test game where the score is 40/40A (second player has advantage)
 */
function initDeuceGame() {
	var game = newTestGame();
	for (var i in threeTimes) game.playerWin(0);
	for (var i in fourTimes) game.playerWin(1);
	return game;
}

// Helpers de flemmard
var threeTimes = [1,2,3];
var fourTimes = [1,2,3,4];
