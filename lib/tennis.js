var scoreJoueurA=0;
var scoreJoueurB=0;
  do {
    var joueurA = Math.random();
    var joueurB = Math.random();
    if ((joueurA > joueurB && scoreJoueurA==15) || (joueurA > joueurB && scoreJoueurA==0)) {
      scoreJoueurA += 15;
      console.log("score de A : " + scoreJoueurA + ", score de B : "  + scoreJoueurB );
    } else if ((joueurB > joueurA && scoreJoueurB==15) || (joueurB > joueurA && scoreJoueurB==0)){
      scoreJoueurB += 15;
      console.log("score de A : " + scoreJoueurA + ", score de B : "  + scoreJoueurB );
    } else if (joueurA > joueurB && scoreJoueurA==30) {
      scoreJoueurA += 10;
      console.log("score de A : " + scoreJoueurA + " > avantage , score de B : " + scoreJoueurB );
    } else if (joueurB > joueurA && scoreJoueurB==30) {
      scoreJoueurB += 10;
      console.log("score de A : " + scoreJoueurA +  " , score de B : " + scoreJoueurB + " > avantage" );
    } else if ((joueurA > joueurB && scoreJoueurA==40) || (joueurB > joueurA && scoreJoueurB==40)){
      console.log("score de A : " + scoreJoueurA +  " , score de B : " + scoreJoueurB );
      break;
    }
  } while (scoreJoueurA <= 40 || scoreJoueurB <= 40) {
     if (scoreJoueurA==40) {
       console.log("le joueur A a gagné")
     } else {
      console.log("le joueur B a gagné")
     }
  }


module.exports = tennis;
