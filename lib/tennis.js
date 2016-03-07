var tennis = {
    game: function(j1, j2) {
        return {
            players: [{ name: j1 || "Joueur1", score: 0, advantage: false },
                { name: j2 || "Joueur2", score: 0, advantage: false }
            ],
            winner: "N",
            playerWin: function(joueur) { // soit 0 soit 1
            	// gestion partie finie
                if (!isNaN(this.winner)) {
                    console.log("La partie est terminée!");
                    throw new Error("game ended");
                    return;
                };
                var autre_joueur = 0;
                if (joueur == 0)
                    autre_joueur = 1;
                var score_autre = this.players[autre_joueur].score;
                var avantage_autre = this.players[autre_joueur].advantage;
                switch (this.players[joueur].score) {
                    case 0:
                        this.players[joueur].score = 15;
                        break;

                    case 15:
                        this.players[joueur].score = 30;
                        break;

                    case 30:
                        this.players[joueur].score = 40;
                        break;

                    case 40:
                        if (score_autre != 40) {
                            this.winner = joueur;
                            console.log('the winner is : ' + this.players[joueur].name + " " + joueur);
                            return;
                        }
                        // ici donc 40 vs 40
                        if (this.players[joueur].advantage) {
                            this.winner = joueur;
                            console.log('the winner is : ' + this.players[joueur].name + " " + joueur);
                            return;
                        }

                        // Le joueur 2 perd son avantage donc on repart à égalité
                        if (avantage_autre) {
                            this.players[autre_joueur].advantage = false;
                            console.log("DEUCE");
                            return;
                        }

                        // Le joueur 1 gagne son avantage (cas resant)
                        this.players[joueur].advantage = true;
                        console.log('Avantage ' + this.players[joueur].name);
                        break;

                    default:
                        break;
                }

                console.log("scores : " + this.players[0].score + " vs " + this.players[1].score);
            }
        }
    }
};

module.exports = tennis;
