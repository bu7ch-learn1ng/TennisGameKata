'use strict'

const tennis = (function() {

/*
 * isNull()
 *          Checks if the element is null.
 * Return:
 *          True if correct, otherwise false.
 */
function isNull(element)
{
	      return (element === null && typeof element === 'object');
}

/*
 * setWinner()
 *          Sets/Unsets the advantage of players or set the winner of the game.
 * Return:
 *          Nothing.
 */
function setWinner(player, that)
{
        const current_player = that.players[player];
				const other_player = (player === 0 ? that.players[1] : that.players[0]);
				const other_player_nb = (player === 0 ? 1: 0);

				if (current_player.score === 40 && other_player.score === 40) {
								if (current_player.advantage === false)
												current_player.advantage = true;
								else if (current_player.advantage === true && other_player.advantage === false)
												that.winner = player;
								else if (current_player.advantage === true && other_player.advantage === true)
												other_player.advantage = false;
				} else if (current_player.score === 40)
								that.winner = player;
}

/*
 * addScore()
 *          Adds the score to the player accordingly to the rules.
 *					Checks if a winner can be set depending on the case.
 * Return:
 *          Nothing.
 */
function addScore(player, that)
{
				switch (that.players[player].score) {
				case 0:
								/* FALLTHROUGH */
				case 15:
								that.players[player].score += 15;
								break;
				case 30:
								that.players[player].score += 10;
								break;
				case 40:
								setWinner(player, that);
								break;
				default:
								break;
				}
}

return {
			/*
	 		 * game()
	 	 	 *          Main routine of the game.
	 	 	 *					Contains all the game's data and logic.
			 * Return:
			 *          An object.
			 */
				game: (player1, player2) =>
				{
								return {
												players: [
																    { name: player1, score: 0, advantage: false },
																		{ name: player2, score: 0, advantage: false }
																	    ],

												winner: null,

												/*
												 * playerWIn()
												 *          Called when a player of the game scores.
												 *					If the game isn't finished, continues the game's logic.
												 *					Otherwise, throw an error.
												 * Return:
												 *          Nothing.
												*/
												playerWin: function(player)
												{
																if (isNull(this.winner))
																				addScore(player, this);
																else
																				throw new Error('game ended');
												}
								};
				}
};

})();

module.exports = tennis;
