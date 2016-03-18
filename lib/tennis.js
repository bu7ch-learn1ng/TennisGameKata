var tennis = {
game : function(p1, p2) {
		return {
			players : [ 
				this.player(p1 || 'P1'), 
				this.player(p2 || 'P2') ],
			winner: NaN,
			
			playerWin: function (pid) {
				
				if (!isNaN(this.winner)) {
					throw new Error("game ended");
				}
				
				var opponent = this.opponent(pid);
				var possibleDeuce = opponent.score == 40;
				var opponentAdvantaged = opponent.advantage;
				
				if (this.players[pid].win(possibleDeuce, opponentAdvantaged)) {
					this.winner = pid;
				}
				
				opponent.advantage = false;
				
			},
			
			opponent: function(pid) {
				return this.players[(pid+1)%2];
			}
		}
	},
	
	player: function(nom) {
		var scoresPossibles = [0, 15, 30, 40];
		
		return {
			
			name: nom,
			score: 0,
			scoreIndex: 0,
			advantage: false,
			
			win: function(deuce, opponentAdvantaged) {
				if (!deuce && this.score == 40) {
					return true;
				} else if (deuce && this.score == 40) {
					if (this.advantage) {
						return true;
					} else {
						this.advantage = !opponentAdvantaged;
						return false;
					}
				} else {
					this.score = scoresPossibles[++this.scoreIndex];
					return false;
				}
			}
		}
	}
	
}
module.exports = tennis;